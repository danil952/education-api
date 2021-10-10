import fs from "fs/promises";
import mongoose from "mongoose";
import { JSObject } from "./HelpersInterfaces";
import HttpErrors from "./ErrorsHTTP";

export default class HelperClass {
  static checkRequiredField = (
    field: string,
    data: JSObject,
    type: string
  ): void => {
    if (Object.prototype.hasOwnProperty.call(data, field)) {
      const isType = typeof data[field] === type;
      if (!isType)
        throw new HttpErrors(
          `wrong type of ${field}`,
          HttpErrors.types.BadRequest
        );
    } else {
      throw new HttpErrors(`${field} is required`, HttpErrors.types.BadRequest);
    }
  };

  static checkID = (_id: string): void => {
    if (!mongoose.isValidObjectId(_id)) {
      throw new HttpErrors(`ID is invalid`, HttpErrors.types.BadRequest);
    }
  };

  static pagination = (
    data: JSObject
  ): { size: number; skip: number; page: number } => {
    let page: number = +(data.page ?? 0);
    const size: number = Math.abs(+(data.size ?? 15));
    page = page > 0 ? page - 1 : 0;
    const skip = page === 0 ? 0 : page * size;
    return { size, skip, page };
  };

  static sortingRule = (sort: string) => {
    const sortArray = sort.split(",");
    const sortRule: JSObject = {};
    for (let i = 0; i < sortArray.length; i += 2) {
      sortRule[sortArray[i]] = sortArray[i + 1] === "desc" ? -1 : 1;
    }
    return sortRule;
  };

  static checkNickName(nick: string) {
    return /^[a-zA-Z0-9_]+$/.test(nick);
  }

  static checkBooleanType(value: any, field: string) {
    if (typeof value !== "boolean") {
      throw new HttpErrors(
        `wrong type of ${field}`,
        HttpErrors.types.BadRequest
      );
    }
  }

  static getAggregationPagination(skip: number, size: number) {
    return {
      $facet: {
        results: [{ $skip: skip }, { $limit: size }],
        totalCount: [{ $count: "count" }]
      }
    };
  }

  static generateTokenId(): number {
    let random = new Date().getTime();
    const min = 1;
    const max = 9;
    while (random / Math.pow(10, 15) < 1) {
      random =
        random * 10 + (Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return random;
  }

  static stripTags(input: string) {
    const regex = /(<(\/?[^>]+)>)|(&#?[a-z0-9]{2,8};)/g;
    return input.replace(regex, "");
  }

  static async sleep(timeoutMs: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, timeoutMs);
    });
  }

  static getDeletingAggregation(rule: JSObject[]) {
    return [
      ...rule,
      {
        $group: {
          _id: null,
          deletingIds: { $addToSet: "$_id" }
        }
      },
      { $project: { _id: 0, deletingIds: 1 } }
    ];
  }
}
