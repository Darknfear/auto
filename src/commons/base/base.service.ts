import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { QueryJoin, ParsedRequestParams } from '@nestjsx/crud-request';
import { isArrayFull } from '@nestjsx/util';
import { ClassConstructor } from 'class-transformer';
import { getFilterParamsQuery, PAGING_KEYS, plainToPagingResponse } from '@utilities/pagination-utils';
import { Brackets, ObjectLiteral, QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { ListRequestDto } from '@common/dtos/list.request.dto';
import * as _ from 'lodash';
import { PaginatedResponseDto } from '@common/dtos/list.response.dto';
import { JoinOptions, QueryOptions } from '@nestjsx/crud';
import { isUUID } from 'class-validator';

@Injectable()
export class BaseService<T> extends TypeOrmCrudService<T> {
  protected stringColumns: string[];
  constructor(repo: Repository<T>) {
    super(repo);

    this.stringColumns = this.repo.metadata.columns
      .filter(
        (column) => column.type === 'string' || (typeof column.type === 'function' && column.type.name === 'String'),
      )
      .map((column) => column.propertyName);
  }

  findDatabaseColumnName = (propertyName: string) =>
    this.repo.metadata.findColumnWithPropertyName(propertyName)?.databaseName || propertyName;

  async getList<RequestDto extends ListRequestDto, ResponseDto>(
    request: RequestDto,
    cls: ClassConstructor<ResponseDto>,
    extendConditions?: {
      where: string | Brackets | ((qb: QueryBuilder<ObjectLiteral>) => string) | ObjectLiteral | ObjectLiteral[];
      parameters?: ObjectLiteral;
    }[],
  ): Promise<PaginatedResponseDto<ResponseDto>> {
    const query = getFilterParamsQuery<RequestDto>(request);
    const { offset, limit, keyword, sortBy, sortType, ...others } = getFilterParamsQuery<RequestDto>(request);
    const builder = this.repo
      .createQueryBuilder(this.repo.metadata.givenTableName)
      .select(`${this.repo.metadata.givenTableName}.*`);

    if (keyword && this.stringColumns.length) {
      if (this.stringColumns.length === 1) {
        builder.andWhere(`LOWER("${this.findDatabaseColumnName(this.stringColumns[0])}") LIKE LOWER(:keyword)`, {
          keyword: `%${keyword.trim()}%`,
        });
      } else {
        const brackets = new Brackets((qb) => {
          qb.where(`LOWER("${this.findDatabaseColumnName(this.stringColumns[0])}") LIKE LOWER(:keyword)`, {
            keyword: `%${keyword.trim()}%`,
          });

          for (let i = 1; i < this.stringColumns.length; i++) {
            qb.orWhere(`LOWER("${this.findDatabaseColumnName(this.stringColumns[i])}") LIKE LOWER(:keyword)`, {
              keyword: `%${keyword.trim()}%`,
            });
          }
        });

        builder.andWhere(brackets);
      }
    }

    others &&
      Object.entries(others).forEach(([key, val]) => {
        if (!PAGING_KEYS.includes(key) && this.repo.metadata.propertiesMap[key] !== undefined) {
          if (typeof this['filterBuilder'] === 'function') {
            this['filterBuilder'](builder, key, val);
          } else {
            this.defaultFilterBuilder(builder, key, val);
          }
        }
      });

    if (extendConditions?.length) {
      extendConditions.forEach((condition) => {
        builder.andWhere(condition.where, condition.parameters);
      });
    }

    if (sortBy) {
      const sortColumns = sortBy.split(',').filter((column) => this.repo.metadata.propertiesMap[column]);
      if (sortColumns.length) {
        builder.orderBy(this.generateOrderByColumn(sortColumns[0]), sortType ?? 'ASC', 'NULLS LAST');

        if (sortColumns.length > 1) {
          for (let i = 1; i < sortColumns.length; i++) {
            builder.addOrderBy(this.generateOrderByColumn(sortColumns[i]), sortType ?? 'ASC', 'NULLS LAST');
          }
        }
      }
    }

    const [data, total] = await Promise.all([builder.limit(limit).offset(offset).getRawMany(), builder.getCount()]);

    return plainToPagingResponse<ResponseDto>(cls, query, { data, total });
  }

  protected generateOrderByColumn(column: string): string {
    if (this.stringColumns.includes(column)) {
      return `LOWER(${this.findDatabaseColumnName(column)})`;
    }

    return this.findDatabaseColumnName(column);
  }

  protected setJoin(cond: QueryJoin, joinOptions: JoinOptions, builder: SelectQueryBuilder<T>) {
    const options = joinOptions[cond.field];

    if (!options) {
      return true;
    }

    const allowedRelation = this.getRelationMetadata(cond.field, options);

    if (!allowedRelation) {
      return true;
    }

    const relationType = options.required ? 'innerJoin' : 'leftJoin';
    const alias = options.alias ? options.alias : allowedRelation.name;

    builder[relationType](allowedRelation.path, alias);

    if (options.select !== false) {
      const columns = isArrayFull(cond.select)
        ? cond.select.filter((column) => allowedRelation.allowedColumns.some((allowed) => allowed === column))
        : allowedRelation.allowedColumns;

      const select = [
        ...new Set([
          ...allowedRelation.primaryColumns,
          ...(isArrayFull(options.persist) ? options.persist : []),
          ...columns,
        ]),
      ].map((col) => `${alias}.${col}`);

      builder.addSelect(Array.from(select));
    }
  }

  protected getSelect(query: ParsedRequestParams, options: QueryOptions): string[] {
    const allowed = this.getAllowedColumns(this.entityColumns, options);

    const columns =
      query.fields && query.fields.length
        ? query.fields.filter((field) => allowed.some((col) => field === col))
        : allowed;

    const select = [
      ...new Set([
        ...(options.persist && options.persist.length ? options.persist : []),
        ...columns,
        ...this.entityPrimaryColumns,
      ]),
    ].map((col) => `${this.alias}.${col}`);

    return Array.from(select);
  }

  defaultFilterBuilder(builder: SelectQueryBuilder<T>, key: string, value: unknown): void {
    if (this.stringColumns.includes(key) && !isUUID(value)) {
      builder.andWhere(`LOWER("${this.findDatabaseColumnName(key)}") LIKE LOWER(:${key})`, {
        [key]: `%${(value as string).trim()}%`,
      });
    } else {
      builder.andWhere(`${this.findDatabaseColumnName(key)} = :${key}`, { [key]: value });
    }
  }

  // filterBuilder(builder: SelectQueryBuilder<T>,key: string, value: unknown): void {
  //   // TODO: implement here
  // });
}
