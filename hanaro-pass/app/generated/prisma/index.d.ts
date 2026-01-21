
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Passport
 * 
 */
export type Passport = $Result.DefaultSelection<Prisma.$PassportPayload>
/**
 * Model ARC
 * 
 */
export type ARC = $Result.DefaultSelection<Prisma.$ARCPayload>
/**
 * Model UserDocument
 * 
 */
export type UserDocument = $Result.DefaultSelection<Prisma.$UserDocumentPayload>
/**
 * Model UserCard
 * 
 */
export type UserCard = $Result.DefaultSelection<Prisma.$UserCardPayload>
/**
 * Model Coupon
 * 
 */
export type Coupon = $Result.DefaultSelection<Prisma.$CouponPayload>
/**
 * Model SavedPlace
 * 
 */
export type SavedPlace = $Result.DefaultSelection<Prisma.$SavedPlacePayload>
/**
 * Model Hospital
 * 
 */
export type Hospital = $Result.DefaultSelection<Prisma.$HospitalPayload>
/**
 * Model HospitalDept
 * 
 */
export type HospitalDept = $Result.DefaultSelection<Prisma.$HospitalDeptPayload>
/**
 * Model HospitalLang
 * 
 */
export type HospitalLang = $Result.DefaultSelection<Prisma.$HospitalLangPayload>
/**
 * Model HospitalReview
 * 
 */
export type HospitalReview = $Result.DefaultSelection<Prisma.$HospitalReviewPayload>
/**
 * Model Embassy
 * 
 */
export type Embassy = $Result.DefaultSelection<Prisma.$EmbassyPayload>
/**
 * Model SymptomMapping
 * 
 */
export type SymptomMapping = $Result.DefaultSelection<Prisma.$SymptomMappingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHERS: 'OTHERS'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const DocType: {
  PHOTO: 'PHOTO',
  COPY: 'COPY',
  STUDENT_ID: 'STUDENT_ID'
};

export type DocType = (typeof DocType)[keyof typeof DocType]


export const CardType: {
  PREPAID_TRAVELER: 'PREPAID_TRAVELER',
  HANA_EZ: 'HANA_EZ'
};

export type CardType = (typeof CardType)[keyof typeof CardType]


export const CouponCategory: {
  FOOD: 'FOOD',
  FASHION: 'FASHION',
  BEAUTY: 'BEAUTY',
  ACTIVITY: 'ACTIVITY',
  TRAVEL: 'TRAVEL'
};

export type CouponCategory = (typeof CouponCategory)[keyof typeof CouponCategory]


export const PlaceCategory: {
  CAFE: 'CAFE',
  FOOD: 'FOOD',
  SHOP: 'SHOP'
};

export type PlaceCategory = (typeof PlaceCategory)[keyof typeof PlaceCategory]

}

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type DocType = $Enums.DocType

export const DocType: typeof $Enums.DocType

export type CardType = $Enums.CardType

export const CardType: typeof $Enums.CardType

export type CouponCategory = $Enums.CouponCategory

export const CouponCategory: typeof $Enums.CouponCategory

export type PlaceCategory = $Enums.PlaceCategory

export const PlaceCategory: typeof $Enums.PlaceCategory

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passport`: Exposes CRUD operations for the **Passport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Passports
    * const passports = await prisma.passport.findMany()
    * ```
    */
  get passport(): Prisma.PassportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aRC`: Exposes CRUD operations for the **ARC** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ARCS
    * const aRCS = await prisma.aRC.findMany()
    * ```
    */
  get aRC(): Prisma.ARCDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userDocument`: Exposes CRUD operations for the **UserDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserDocuments
    * const userDocuments = await prisma.userDocument.findMany()
    * ```
    */
  get userDocument(): Prisma.UserDocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userCard`: Exposes CRUD operations for the **UserCard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserCards
    * const userCards = await prisma.userCard.findMany()
    * ```
    */
  get userCard(): Prisma.UserCardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.coupon`: Exposes CRUD operations for the **Coupon** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Coupons
    * const coupons = await prisma.coupon.findMany()
    * ```
    */
  get coupon(): Prisma.CouponDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.savedPlace`: Exposes CRUD operations for the **SavedPlace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedPlaces
    * const savedPlaces = await prisma.savedPlace.findMany()
    * ```
    */
  get savedPlace(): Prisma.SavedPlaceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hospital`: Exposes CRUD operations for the **Hospital** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Hospitals
    * const hospitals = await prisma.hospital.findMany()
    * ```
    */
  get hospital(): Prisma.HospitalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hospitalDept`: Exposes CRUD operations for the **HospitalDept** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HospitalDepts
    * const hospitalDepts = await prisma.hospitalDept.findMany()
    * ```
    */
  get hospitalDept(): Prisma.HospitalDeptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hospitalLang`: Exposes CRUD operations for the **HospitalLang** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HospitalLangs
    * const hospitalLangs = await prisma.hospitalLang.findMany()
    * ```
    */
  get hospitalLang(): Prisma.HospitalLangDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hospitalReview`: Exposes CRUD operations for the **HospitalReview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HospitalReviews
    * const hospitalReviews = await prisma.hospitalReview.findMany()
    * ```
    */
  get hospitalReview(): Prisma.HospitalReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.embassy`: Exposes CRUD operations for the **Embassy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Embassies
    * const embassies = await prisma.embassy.findMany()
    * ```
    */
  get embassy(): Prisma.EmbassyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.symptomMapping`: Exposes CRUD operations for the **SymptomMapping** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SymptomMappings
    * const symptomMappings = await prisma.symptomMapping.findMany()
    * ```
    */
  get symptomMapping(): Prisma.SymptomMappingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Passport: 'Passport',
    ARC: 'ARC',
    UserDocument: 'UserDocument',
    UserCard: 'UserCard',
    Coupon: 'Coupon',
    SavedPlace: 'SavedPlace',
    Hospital: 'Hospital',
    HospitalDept: 'HospitalDept',
    HospitalLang: 'HospitalLang',
    HospitalReview: 'HospitalReview',
    Embassy: 'Embassy',
    SymptomMapping: 'SymptomMapping'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "passport" | "aRC" | "userDocument" | "userCard" | "coupon" | "savedPlace" | "hospital" | "hospitalDept" | "hospitalLang" | "hospitalReview" | "embassy" | "symptomMapping"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Passport: {
        payload: Prisma.$PassportPayload<ExtArgs>
        fields: Prisma.PassportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PassportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PassportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassportPayload>
          }
          findFirst: {
            args: Prisma.PassportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PassportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassportPayload>
          }
          findMany: {
            args: Prisma.PassportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassportPayload>[]
          }
          create: {
            args: Prisma.PassportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassportPayload>
          }
          createMany: {
            args: Prisma.PassportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PassportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassportPayload>
          }
          update: {
            args: Prisma.PassportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassportPayload>
          }
          deleteMany: {
            args: Prisma.PassportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PassportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PassportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassportPayload>
          }
          aggregate: {
            args: Prisma.PassportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePassport>
          }
          groupBy: {
            args: Prisma.PassportGroupByArgs<ExtArgs>
            result: $Utils.Optional<PassportGroupByOutputType>[]
          }
          count: {
            args: Prisma.PassportCountArgs<ExtArgs>
            result: $Utils.Optional<PassportCountAggregateOutputType> | number
          }
        }
      }
      ARC: {
        payload: Prisma.$ARCPayload<ExtArgs>
        fields: Prisma.ARCFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ARCFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ARCPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ARCFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ARCPayload>
          }
          findFirst: {
            args: Prisma.ARCFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ARCPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ARCFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ARCPayload>
          }
          findMany: {
            args: Prisma.ARCFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ARCPayload>[]
          }
          create: {
            args: Prisma.ARCCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ARCPayload>
          }
          createMany: {
            args: Prisma.ARCCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ARCDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ARCPayload>
          }
          update: {
            args: Prisma.ARCUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ARCPayload>
          }
          deleteMany: {
            args: Prisma.ARCDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ARCUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ARCUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ARCPayload>
          }
          aggregate: {
            args: Prisma.ARCAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateARC>
          }
          groupBy: {
            args: Prisma.ARCGroupByArgs<ExtArgs>
            result: $Utils.Optional<ARCGroupByOutputType>[]
          }
          count: {
            args: Prisma.ARCCountArgs<ExtArgs>
            result: $Utils.Optional<ARCCountAggregateOutputType> | number
          }
        }
      }
      UserDocument: {
        payload: Prisma.$UserDocumentPayload<ExtArgs>
        fields: Prisma.UserDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>
          }
          findFirst: {
            args: Prisma.UserDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>
          }
          findMany: {
            args: Prisma.UserDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>[]
          }
          create: {
            args: Prisma.UserDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>
          }
          createMany: {
            args: Prisma.UserDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>
          }
          update: {
            args: Prisma.UserDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>
          }
          deleteMany: {
            args: Prisma.UserDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>
          }
          aggregate: {
            args: Prisma.UserDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserDocument>
          }
          groupBy: {
            args: Prisma.UserDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<UserDocumentCountAggregateOutputType> | number
          }
        }
      }
      UserCard: {
        payload: Prisma.$UserCardPayload<ExtArgs>
        fields: Prisma.UserCardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserCardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserCardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>
          }
          findFirst: {
            args: Prisma.UserCardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserCardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>
          }
          findMany: {
            args: Prisma.UserCardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>[]
          }
          create: {
            args: Prisma.UserCardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>
          }
          createMany: {
            args: Prisma.UserCardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserCardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>
          }
          update: {
            args: Prisma.UserCardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>
          }
          deleteMany: {
            args: Prisma.UserCardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserCardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserCardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCardPayload>
          }
          aggregate: {
            args: Prisma.UserCardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserCard>
          }
          groupBy: {
            args: Prisma.UserCardGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserCardGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCardCountArgs<ExtArgs>
            result: $Utils.Optional<UserCardCountAggregateOutputType> | number
          }
        }
      }
      Coupon: {
        payload: Prisma.$CouponPayload<ExtArgs>
        fields: Prisma.CouponFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CouponFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CouponFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>
          }
          findFirst: {
            args: Prisma.CouponFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CouponFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>
          }
          findMany: {
            args: Prisma.CouponFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>[]
          }
          create: {
            args: Prisma.CouponCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>
          }
          createMany: {
            args: Prisma.CouponCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CouponDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>
          }
          update: {
            args: Prisma.CouponUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>
          }
          deleteMany: {
            args: Prisma.CouponDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CouponUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CouponUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CouponPayload>
          }
          aggregate: {
            args: Prisma.CouponAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCoupon>
          }
          groupBy: {
            args: Prisma.CouponGroupByArgs<ExtArgs>
            result: $Utils.Optional<CouponGroupByOutputType>[]
          }
          count: {
            args: Prisma.CouponCountArgs<ExtArgs>
            result: $Utils.Optional<CouponCountAggregateOutputType> | number
          }
        }
      }
      SavedPlace: {
        payload: Prisma.$SavedPlacePayload<ExtArgs>
        fields: Prisma.SavedPlaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedPlaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPlacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedPlaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPlacePayload>
          }
          findFirst: {
            args: Prisma.SavedPlaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPlacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedPlaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPlacePayload>
          }
          findMany: {
            args: Prisma.SavedPlaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPlacePayload>[]
          }
          create: {
            args: Prisma.SavedPlaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPlacePayload>
          }
          createMany: {
            args: Prisma.SavedPlaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SavedPlaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPlacePayload>
          }
          update: {
            args: Prisma.SavedPlaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPlacePayload>
          }
          deleteMany: {
            args: Prisma.SavedPlaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedPlaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SavedPlaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedPlacePayload>
          }
          aggregate: {
            args: Prisma.SavedPlaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSavedPlace>
          }
          groupBy: {
            args: Prisma.SavedPlaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedPlaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedPlaceCountArgs<ExtArgs>
            result: $Utils.Optional<SavedPlaceCountAggregateOutputType> | number
          }
        }
      }
      Hospital: {
        payload: Prisma.$HospitalPayload<ExtArgs>
        fields: Prisma.HospitalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HospitalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HospitalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          findFirst: {
            args: Prisma.HospitalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HospitalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          findMany: {
            args: Prisma.HospitalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>[]
          }
          create: {
            args: Prisma.HospitalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          createMany: {
            args: Prisma.HospitalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.HospitalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          update: {
            args: Prisma.HospitalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          deleteMany: {
            args: Prisma.HospitalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HospitalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HospitalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          aggregate: {
            args: Prisma.HospitalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHospital>
          }
          groupBy: {
            args: Prisma.HospitalGroupByArgs<ExtArgs>
            result: $Utils.Optional<HospitalGroupByOutputType>[]
          }
          count: {
            args: Prisma.HospitalCountArgs<ExtArgs>
            result: $Utils.Optional<HospitalCountAggregateOutputType> | number
          }
        }
      }
      HospitalDept: {
        payload: Prisma.$HospitalDeptPayload<ExtArgs>
        fields: Prisma.HospitalDeptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HospitalDeptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalDeptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HospitalDeptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalDeptPayload>
          }
          findFirst: {
            args: Prisma.HospitalDeptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalDeptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HospitalDeptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalDeptPayload>
          }
          findMany: {
            args: Prisma.HospitalDeptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalDeptPayload>[]
          }
          create: {
            args: Prisma.HospitalDeptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalDeptPayload>
          }
          createMany: {
            args: Prisma.HospitalDeptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.HospitalDeptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalDeptPayload>
          }
          update: {
            args: Prisma.HospitalDeptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalDeptPayload>
          }
          deleteMany: {
            args: Prisma.HospitalDeptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HospitalDeptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HospitalDeptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalDeptPayload>
          }
          aggregate: {
            args: Prisma.HospitalDeptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHospitalDept>
          }
          groupBy: {
            args: Prisma.HospitalDeptGroupByArgs<ExtArgs>
            result: $Utils.Optional<HospitalDeptGroupByOutputType>[]
          }
          count: {
            args: Prisma.HospitalDeptCountArgs<ExtArgs>
            result: $Utils.Optional<HospitalDeptCountAggregateOutputType> | number
          }
        }
      }
      HospitalLang: {
        payload: Prisma.$HospitalLangPayload<ExtArgs>
        fields: Prisma.HospitalLangFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HospitalLangFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalLangPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HospitalLangFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalLangPayload>
          }
          findFirst: {
            args: Prisma.HospitalLangFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalLangPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HospitalLangFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalLangPayload>
          }
          findMany: {
            args: Prisma.HospitalLangFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalLangPayload>[]
          }
          create: {
            args: Prisma.HospitalLangCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalLangPayload>
          }
          createMany: {
            args: Prisma.HospitalLangCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.HospitalLangDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalLangPayload>
          }
          update: {
            args: Prisma.HospitalLangUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalLangPayload>
          }
          deleteMany: {
            args: Prisma.HospitalLangDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HospitalLangUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HospitalLangUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalLangPayload>
          }
          aggregate: {
            args: Prisma.HospitalLangAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHospitalLang>
          }
          groupBy: {
            args: Prisma.HospitalLangGroupByArgs<ExtArgs>
            result: $Utils.Optional<HospitalLangGroupByOutputType>[]
          }
          count: {
            args: Prisma.HospitalLangCountArgs<ExtArgs>
            result: $Utils.Optional<HospitalLangCountAggregateOutputType> | number
          }
        }
      }
      HospitalReview: {
        payload: Prisma.$HospitalReviewPayload<ExtArgs>
        fields: Prisma.HospitalReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HospitalReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HospitalReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReviewPayload>
          }
          findFirst: {
            args: Prisma.HospitalReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HospitalReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReviewPayload>
          }
          findMany: {
            args: Prisma.HospitalReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReviewPayload>[]
          }
          create: {
            args: Prisma.HospitalReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReviewPayload>
          }
          createMany: {
            args: Prisma.HospitalReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.HospitalReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReviewPayload>
          }
          update: {
            args: Prisma.HospitalReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReviewPayload>
          }
          deleteMany: {
            args: Prisma.HospitalReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HospitalReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HospitalReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalReviewPayload>
          }
          aggregate: {
            args: Prisma.HospitalReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHospitalReview>
          }
          groupBy: {
            args: Prisma.HospitalReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<HospitalReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.HospitalReviewCountArgs<ExtArgs>
            result: $Utils.Optional<HospitalReviewCountAggregateOutputType> | number
          }
        }
      }
      Embassy: {
        payload: Prisma.$EmbassyPayload<ExtArgs>
        fields: Prisma.EmbassyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmbassyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbassyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmbassyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbassyPayload>
          }
          findFirst: {
            args: Prisma.EmbassyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbassyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmbassyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbassyPayload>
          }
          findMany: {
            args: Prisma.EmbassyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbassyPayload>[]
          }
          create: {
            args: Prisma.EmbassyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbassyPayload>
          }
          createMany: {
            args: Prisma.EmbassyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmbassyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbassyPayload>
          }
          update: {
            args: Prisma.EmbassyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbassyPayload>
          }
          deleteMany: {
            args: Prisma.EmbassyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmbassyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmbassyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbassyPayload>
          }
          aggregate: {
            args: Prisma.EmbassyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmbassy>
          }
          groupBy: {
            args: Prisma.EmbassyGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmbassyGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmbassyCountArgs<ExtArgs>
            result: $Utils.Optional<EmbassyCountAggregateOutputType> | number
          }
        }
      }
      SymptomMapping: {
        payload: Prisma.$SymptomMappingPayload<ExtArgs>
        fields: Prisma.SymptomMappingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SymptomMappingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomMappingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SymptomMappingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomMappingPayload>
          }
          findFirst: {
            args: Prisma.SymptomMappingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomMappingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SymptomMappingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomMappingPayload>
          }
          findMany: {
            args: Prisma.SymptomMappingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomMappingPayload>[]
          }
          create: {
            args: Prisma.SymptomMappingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomMappingPayload>
          }
          createMany: {
            args: Prisma.SymptomMappingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SymptomMappingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomMappingPayload>
          }
          update: {
            args: Prisma.SymptomMappingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomMappingPayload>
          }
          deleteMany: {
            args: Prisma.SymptomMappingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SymptomMappingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SymptomMappingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomMappingPayload>
          }
          aggregate: {
            args: Prisma.SymptomMappingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSymptomMapping>
          }
          groupBy: {
            args: Prisma.SymptomMappingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SymptomMappingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SymptomMappingCountArgs<ExtArgs>
            result: $Utils.Optional<SymptomMappingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    passport?: PassportOmit
    aRC?: ARCOmit
    userDocument?: UserDocumentOmit
    userCard?: UserCardOmit
    coupon?: CouponOmit
    savedPlace?: SavedPlaceOmit
    hospital?: HospitalOmit
    hospitalDept?: HospitalDeptOmit
    hospitalLang?: HospitalLangOmit
    hospitalReview?: HospitalReviewOmit
    embassy?: EmbassyOmit
    symptomMapping?: SymptomMappingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    UserDocument: number
    UserCard: number
    SavedPlace: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    UserDocument?: boolean | UserCountOutputTypeCountUserDocumentArgs
    UserCard?: boolean | UserCountOutputTypeCountUserCardArgs
    SavedPlace?: boolean | UserCountOutputTypeCountSavedPlaceArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserDocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDocumentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserCardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCardWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSavedPlaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedPlaceWhereInput
  }


  /**
   * Count Type HospitalCountOutputType
   */

  export type HospitalCountOutputType = {
    HospitalDept: number
    HospitalLang: number
  }

  export type HospitalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    HospitalDept?: boolean | HospitalCountOutputTypeCountHospitalDeptArgs
    HospitalLang?: boolean | HospitalCountOutputTypeCountHospitalLangArgs
  }

  // Custom InputTypes
  /**
   * HospitalCountOutputType without action
   */
  export type HospitalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalCountOutputType
     */
    select?: HospitalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HospitalCountOutputType without action
   */
  export type HospitalCountOutputTypeCountHospitalDeptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalDeptWhereInput
  }

  /**
   * HospitalCountOutputType without action
   */
  export type HospitalCountOutputTypeCountHospitalLangArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalLangWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    nickname: string | null
    nationality: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    nickname: string | null
    nationality: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nickname: number
    nationality: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    nickname?: true
    nationality?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nickname?: true
    nationality?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nickname?: true
    nationality?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    nickname: string
    nationality: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nickname?: boolean
    nationality?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Passport?: boolean | User$PassportArgs<ExtArgs>
    ARC?: boolean | User$ARCArgs<ExtArgs>
    UserDocument?: boolean | User$UserDocumentArgs<ExtArgs>
    UserCard?: boolean | User$UserCardArgs<ExtArgs>
    SavedPlace?: boolean | User$SavedPlaceArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    nickname?: boolean
    nationality?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nickname" | "nationality" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Passport?: boolean | User$PassportArgs<ExtArgs>
    ARC?: boolean | User$ARCArgs<ExtArgs>
    UserDocument?: boolean | User$UserDocumentArgs<ExtArgs>
    UserCard?: boolean | User$UserCardArgs<ExtArgs>
    SavedPlace?: boolean | User$SavedPlaceArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Passport: Prisma.$PassportPayload<ExtArgs> | null
      ARC: Prisma.$ARCPayload<ExtArgs> | null
      UserDocument: Prisma.$UserDocumentPayload<ExtArgs>[]
      UserCard: Prisma.$UserCardPayload<ExtArgs>[]
      SavedPlace: Prisma.$SavedPlacePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nickname: string
      nationality: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Passport<T extends User$PassportArgs<ExtArgs> = {}>(args?: Subset<T, User$PassportArgs<ExtArgs>>): Prisma__PassportClient<$Result.GetResult<Prisma.$PassportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ARC<T extends User$ARCArgs<ExtArgs> = {}>(args?: Subset<T, User$ARCArgs<ExtArgs>>): Prisma__ARCClient<$Result.GetResult<Prisma.$ARCPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    UserDocument<T extends User$UserDocumentArgs<ExtArgs> = {}>(args?: Subset<T, User$UserDocumentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    UserCard<T extends User$UserCardArgs<ExtArgs> = {}>(args?: Subset<T, User$UserCardArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    SavedPlace<T extends User$SavedPlaceArgs<ExtArgs> = {}>(args?: Subset<T, User$SavedPlaceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedPlacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly nickname: FieldRef<"User", 'String'>
    readonly nationality: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Passport
   */
  export type User$PassportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passport
     */
    select?: PassportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passport
     */
    omit?: PassportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassportInclude<ExtArgs> | null
    where?: PassportWhereInput
  }

  /**
   * User.ARC
   */
  export type User$ARCArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ARC
     */
    select?: ARCSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ARC
     */
    omit?: ARCOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ARCInclude<ExtArgs> | null
    where?: ARCWhereInput
  }

  /**
   * User.UserDocument
   */
  export type User$UserDocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    where?: UserDocumentWhereInput
    orderBy?: UserDocumentOrderByWithRelationInput | UserDocumentOrderByWithRelationInput[]
    cursor?: UserDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDocumentScalarFieldEnum | UserDocumentScalarFieldEnum[]
  }

  /**
   * User.UserCard
   */
  export type User$UserCardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    where?: UserCardWhereInput
    orderBy?: UserCardOrderByWithRelationInput | UserCardOrderByWithRelationInput[]
    cursor?: UserCardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserCardScalarFieldEnum | UserCardScalarFieldEnum[]
  }

  /**
   * User.SavedPlace
   */
  export type User$SavedPlaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPlace
     */
    select?: SavedPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedPlace
     */
    omit?: SavedPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPlaceInclude<ExtArgs> | null
    where?: SavedPlaceWhereInput
    orderBy?: SavedPlaceOrderByWithRelationInput | SavedPlaceOrderByWithRelationInput[]
    cursor?: SavedPlaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedPlaceScalarFieldEnum | SavedPlaceScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Passport
   */

  export type AggregatePassport = {
    _count: PassportCountAggregateOutputType | null
    _avg: PassportAvgAggregateOutputType | null
    _sum: PassportSumAggregateOutputType | null
    _min: PassportMinAggregateOutputType | null
    _max: PassportMaxAggregateOutputType | null
  }

  export type PassportAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type PassportSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type PassportMinAggregateOutputType = {
    id: number | null
    userId: number | null
    passportNumber: string | null
    gender: $Enums.Gender | null
    issueDate: Date | null
    expiryDate: Date | null
    userPhotoUrl: string | null
    createdAt: Date | null
  }

  export type PassportMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    passportNumber: string | null
    gender: $Enums.Gender | null
    issueDate: Date | null
    expiryDate: Date | null
    userPhotoUrl: string | null
    createdAt: Date | null
  }

  export type PassportCountAggregateOutputType = {
    id: number
    userId: number
    passportNumber: number
    gender: number
    issueDate: number
    expiryDate: number
    userPhotoUrl: number
    createdAt: number
    _all: number
  }


  export type PassportAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type PassportSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type PassportMinAggregateInputType = {
    id?: true
    userId?: true
    passportNumber?: true
    gender?: true
    issueDate?: true
    expiryDate?: true
    userPhotoUrl?: true
    createdAt?: true
  }

  export type PassportMaxAggregateInputType = {
    id?: true
    userId?: true
    passportNumber?: true
    gender?: true
    issueDate?: true
    expiryDate?: true
    userPhotoUrl?: true
    createdAt?: true
  }

  export type PassportCountAggregateInputType = {
    id?: true
    userId?: true
    passportNumber?: true
    gender?: true
    issueDate?: true
    expiryDate?: true
    userPhotoUrl?: true
    createdAt?: true
    _all?: true
  }

  export type PassportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Passport to aggregate.
     */
    where?: PassportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passports to fetch.
     */
    orderBy?: PassportOrderByWithRelationInput | PassportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PassportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Passports
    **/
    _count?: true | PassportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PassportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PassportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PassportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PassportMaxAggregateInputType
  }

  export type GetPassportAggregateType<T extends PassportAggregateArgs> = {
        [P in keyof T & keyof AggregatePassport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePassport[P]>
      : GetScalarType<T[P], AggregatePassport[P]>
  }




  export type PassportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PassportWhereInput
    orderBy?: PassportOrderByWithAggregationInput | PassportOrderByWithAggregationInput[]
    by: PassportScalarFieldEnum[] | PassportScalarFieldEnum
    having?: PassportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PassportCountAggregateInputType | true
    _avg?: PassportAvgAggregateInputType
    _sum?: PassportSumAggregateInputType
    _min?: PassportMinAggregateInputType
    _max?: PassportMaxAggregateInputType
  }

  export type PassportGroupByOutputType = {
    id: number
    userId: number
    passportNumber: string
    gender: $Enums.Gender
    issueDate: Date
    expiryDate: Date
    userPhotoUrl: string
    createdAt: Date
    _count: PassportCountAggregateOutputType | null
    _avg: PassportAvgAggregateOutputType | null
    _sum: PassportSumAggregateOutputType | null
    _min: PassportMinAggregateOutputType | null
    _max: PassportMaxAggregateOutputType | null
  }

  type GetPassportGroupByPayload<T extends PassportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PassportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PassportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PassportGroupByOutputType[P]>
            : GetScalarType<T[P], PassportGroupByOutputType[P]>
        }
      >
    >


  export type PassportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    passportNumber?: boolean
    gender?: boolean
    issueDate?: boolean
    expiryDate?: boolean
    userPhotoUrl?: boolean
    createdAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passport"]>



  export type PassportSelectScalar = {
    id?: boolean
    userId?: boolean
    passportNumber?: boolean
    gender?: boolean
    issueDate?: boolean
    expiryDate?: boolean
    userPhotoUrl?: boolean
    createdAt?: boolean
  }

  export type PassportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "passportNumber" | "gender" | "issueDate" | "expiryDate" | "userPhotoUrl" | "createdAt", ExtArgs["result"]["passport"]>
  export type PassportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PassportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Passport"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      passportNumber: string
      gender: $Enums.Gender
      issueDate: Date
      expiryDate: Date
      userPhotoUrl: string
      createdAt: Date
    }, ExtArgs["result"]["passport"]>
    composites: {}
  }

  type PassportGetPayload<S extends boolean | null | undefined | PassportDefaultArgs> = $Result.GetResult<Prisma.$PassportPayload, S>

  type PassportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PassportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PassportCountAggregateInputType | true
    }

  export interface PassportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Passport'], meta: { name: 'Passport' } }
    /**
     * Find zero or one Passport that matches the filter.
     * @param {PassportFindUniqueArgs} args - Arguments to find a Passport
     * @example
     * // Get one Passport
     * const passport = await prisma.passport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PassportFindUniqueArgs>(args: SelectSubset<T, PassportFindUniqueArgs<ExtArgs>>): Prisma__PassportClient<$Result.GetResult<Prisma.$PassportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Passport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PassportFindUniqueOrThrowArgs} args - Arguments to find a Passport
     * @example
     * // Get one Passport
     * const passport = await prisma.passport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PassportFindUniqueOrThrowArgs>(args: SelectSubset<T, PassportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PassportClient<$Result.GetResult<Prisma.$PassportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Passport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassportFindFirstArgs} args - Arguments to find a Passport
     * @example
     * // Get one Passport
     * const passport = await prisma.passport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PassportFindFirstArgs>(args?: SelectSubset<T, PassportFindFirstArgs<ExtArgs>>): Prisma__PassportClient<$Result.GetResult<Prisma.$PassportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Passport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassportFindFirstOrThrowArgs} args - Arguments to find a Passport
     * @example
     * // Get one Passport
     * const passport = await prisma.passport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PassportFindFirstOrThrowArgs>(args?: SelectSubset<T, PassportFindFirstOrThrowArgs<ExtArgs>>): Prisma__PassportClient<$Result.GetResult<Prisma.$PassportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Passports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Passports
     * const passports = await prisma.passport.findMany()
     * 
     * // Get first 10 Passports
     * const passports = await prisma.passport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passportWithIdOnly = await prisma.passport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PassportFindManyArgs>(args?: SelectSubset<T, PassportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PassportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Passport.
     * @param {PassportCreateArgs} args - Arguments to create a Passport.
     * @example
     * // Create one Passport
     * const Passport = await prisma.passport.create({
     *   data: {
     *     // ... data to create a Passport
     *   }
     * })
     * 
     */
    create<T extends PassportCreateArgs>(args: SelectSubset<T, PassportCreateArgs<ExtArgs>>): Prisma__PassportClient<$Result.GetResult<Prisma.$PassportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Passports.
     * @param {PassportCreateManyArgs} args - Arguments to create many Passports.
     * @example
     * // Create many Passports
     * const passport = await prisma.passport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PassportCreateManyArgs>(args?: SelectSubset<T, PassportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Passport.
     * @param {PassportDeleteArgs} args - Arguments to delete one Passport.
     * @example
     * // Delete one Passport
     * const Passport = await prisma.passport.delete({
     *   where: {
     *     // ... filter to delete one Passport
     *   }
     * })
     * 
     */
    delete<T extends PassportDeleteArgs>(args: SelectSubset<T, PassportDeleteArgs<ExtArgs>>): Prisma__PassportClient<$Result.GetResult<Prisma.$PassportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Passport.
     * @param {PassportUpdateArgs} args - Arguments to update one Passport.
     * @example
     * // Update one Passport
     * const passport = await prisma.passport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PassportUpdateArgs>(args: SelectSubset<T, PassportUpdateArgs<ExtArgs>>): Prisma__PassportClient<$Result.GetResult<Prisma.$PassportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Passports.
     * @param {PassportDeleteManyArgs} args - Arguments to filter Passports to delete.
     * @example
     * // Delete a few Passports
     * const { count } = await prisma.passport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PassportDeleteManyArgs>(args?: SelectSubset<T, PassportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Passports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Passports
     * const passport = await prisma.passport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PassportUpdateManyArgs>(args: SelectSubset<T, PassportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Passport.
     * @param {PassportUpsertArgs} args - Arguments to update or create a Passport.
     * @example
     * // Update or create a Passport
     * const passport = await prisma.passport.upsert({
     *   create: {
     *     // ... data to create a Passport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Passport we want to update
     *   }
     * })
     */
    upsert<T extends PassportUpsertArgs>(args: SelectSubset<T, PassportUpsertArgs<ExtArgs>>): Prisma__PassportClient<$Result.GetResult<Prisma.$PassportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Passports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassportCountArgs} args - Arguments to filter Passports to count.
     * @example
     * // Count the number of Passports
     * const count = await prisma.passport.count({
     *   where: {
     *     // ... the filter for the Passports we want to count
     *   }
     * })
    **/
    count<T extends PassportCountArgs>(
      args?: Subset<T, PassportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PassportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Passport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PassportAggregateArgs>(args: Subset<T, PassportAggregateArgs>): Prisma.PrismaPromise<GetPassportAggregateType<T>>

    /**
     * Group by Passport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PassportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PassportGroupByArgs['orderBy'] }
        : { orderBy?: PassportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PassportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPassportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Passport model
   */
  readonly fields: PassportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Passport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PassportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Passport model
   */
  interface PassportFieldRefs {
    readonly id: FieldRef<"Passport", 'Int'>
    readonly userId: FieldRef<"Passport", 'Int'>
    readonly passportNumber: FieldRef<"Passport", 'String'>
    readonly gender: FieldRef<"Passport", 'Gender'>
    readonly issueDate: FieldRef<"Passport", 'DateTime'>
    readonly expiryDate: FieldRef<"Passport", 'DateTime'>
    readonly userPhotoUrl: FieldRef<"Passport", 'String'>
    readonly createdAt: FieldRef<"Passport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Passport findUnique
   */
  export type PassportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passport
     */
    select?: PassportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passport
     */
    omit?: PassportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassportInclude<ExtArgs> | null
    /**
     * Filter, which Passport to fetch.
     */
    where: PassportWhereUniqueInput
  }

  /**
   * Passport findUniqueOrThrow
   */
  export type PassportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passport
     */
    select?: PassportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passport
     */
    omit?: PassportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassportInclude<ExtArgs> | null
    /**
     * Filter, which Passport to fetch.
     */
    where: PassportWhereUniqueInput
  }

  /**
   * Passport findFirst
   */
  export type PassportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passport
     */
    select?: PassportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passport
     */
    omit?: PassportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassportInclude<ExtArgs> | null
    /**
     * Filter, which Passport to fetch.
     */
    where?: PassportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passports to fetch.
     */
    orderBy?: PassportOrderByWithRelationInput | PassportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passports.
     */
    cursor?: PassportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passports.
     */
    distinct?: PassportScalarFieldEnum | PassportScalarFieldEnum[]
  }

  /**
   * Passport findFirstOrThrow
   */
  export type PassportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passport
     */
    select?: PassportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passport
     */
    omit?: PassportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassportInclude<ExtArgs> | null
    /**
     * Filter, which Passport to fetch.
     */
    where?: PassportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passports to fetch.
     */
    orderBy?: PassportOrderByWithRelationInput | PassportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passports.
     */
    cursor?: PassportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passports.
     */
    distinct?: PassportScalarFieldEnum | PassportScalarFieldEnum[]
  }

  /**
   * Passport findMany
   */
  export type PassportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passport
     */
    select?: PassportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passport
     */
    omit?: PassportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassportInclude<ExtArgs> | null
    /**
     * Filter, which Passports to fetch.
     */
    where?: PassportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passports to fetch.
     */
    orderBy?: PassportOrderByWithRelationInput | PassportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Passports.
     */
    cursor?: PassportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passports.
     */
    skip?: number
    distinct?: PassportScalarFieldEnum | PassportScalarFieldEnum[]
  }

  /**
   * Passport create
   */
  export type PassportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passport
     */
    select?: PassportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passport
     */
    omit?: PassportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassportInclude<ExtArgs> | null
    /**
     * The data needed to create a Passport.
     */
    data: XOR<PassportCreateInput, PassportUncheckedCreateInput>
  }

  /**
   * Passport createMany
   */
  export type PassportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Passports.
     */
    data: PassportCreateManyInput | PassportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Passport update
   */
  export type PassportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passport
     */
    select?: PassportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passport
     */
    omit?: PassportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassportInclude<ExtArgs> | null
    /**
     * The data needed to update a Passport.
     */
    data: XOR<PassportUpdateInput, PassportUncheckedUpdateInput>
    /**
     * Choose, which Passport to update.
     */
    where: PassportWhereUniqueInput
  }

  /**
   * Passport updateMany
   */
  export type PassportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Passports.
     */
    data: XOR<PassportUpdateManyMutationInput, PassportUncheckedUpdateManyInput>
    /**
     * Filter which Passports to update
     */
    where?: PassportWhereInput
    /**
     * Limit how many Passports to update.
     */
    limit?: number
  }

  /**
   * Passport upsert
   */
  export type PassportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passport
     */
    select?: PassportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passport
     */
    omit?: PassportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassportInclude<ExtArgs> | null
    /**
     * The filter to search for the Passport to update in case it exists.
     */
    where: PassportWhereUniqueInput
    /**
     * In case the Passport found by the `where` argument doesn't exist, create a new Passport with this data.
     */
    create: XOR<PassportCreateInput, PassportUncheckedCreateInput>
    /**
     * In case the Passport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PassportUpdateInput, PassportUncheckedUpdateInput>
  }

  /**
   * Passport delete
   */
  export type PassportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passport
     */
    select?: PassportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passport
     */
    omit?: PassportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassportInclude<ExtArgs> | null
    /**
     * Filter which Passport to delete.
     */
    where: PassportWhereUniqueInput
  }

  /**
   * Passport deleteMany
   */
  export type PassportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Passports to delete
     */
    where?: PassportWhereInput
    /**
     * Limit how many Passports to delete.
     */
    limit?: number
  }

  /**
   * Passport without action
   */
  export type PassportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Passport
     */
    select?: PassportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Passport
     */
    omit?: PassportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PassportInclude<ExtArgs> | null
  }


  /**
   * Model ARC
   */

  export type AggregateARC = {
    _count: ARCCountAggregateOutputType | null
    _avg: ARCAvgAggregateOutputType | null
    _sum: ARCSumAggregateOutputType | null
    _min: ARCMinAggregateOutputType | null
    _max: ARCMaxAggregateOutputType | null
  }

  export type ARCAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ARCSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ARCMinAggregateOutputType = {
    id: number | null
    userId: number | null
    arcNumber: string | null
    residenceStatus: string | null
    issueDate: Date | null
    userPhotoUrl: string | null
    createdAt: Date | null
  }

  export type ARCMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    arcNumber: string | null
    residenceStatus: string | null
    issueDate: Date | null
    userPhotoUrl: string | null
    createdAt: Date | null
  }

  export type ARCCountAggregateOutputType = {
    id: number
    userId: number
    arcNumber: number
    residenceStatus: number
    issueDate: number
    userPhotoUrl: number
    createdAt: number
    _all: number
  }


  export type ARCAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ARCSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ARCMinAggregateInputType = {
    id?: true
    userId?: true
    arcNumber?: true
    residenceStatus?: true
    issueDate?: true
    userPhotoUrl?: true
    createdAt?: true
  }

  export type ARCMaxAggregateInputType = {
    id?: true
    userId?: true
    arcNumber?: true
    residenceStatus?: true
    issueDate?: true
    userPhotoUrl?: true
    createdAt?: true
  }

  export type ARCCountAggregateInputType = {
    id?: true
    userId?: true
    arcNumber?: true
    residenceStatus?: true
    issueDate?: true
    userPhotoUrl?: true
    createdAt?: true
    _all?: true
  }

  export type ARCAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ARC to aggregate.
     */
    where?: ARCWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ARCS to fetch.
     */
    orderBy?: ARCOrderByWithRelationInput | ARCOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ARCWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ARCS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ARCS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ARCS
    **/
    _count?: true | ARCCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ARCAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ARCSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ARCMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ARCMaxAggregateInputType
  }

  export type GetARCAggregateType<T extends ARCAggregateArgs> = {
        [P in keyof T & keyof AggregateARC]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateARC[P]>
      : GetScalarType<T[P], AggregateARC[P]>
  }




  export type ARCGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ARCWhereInput
    orderBy?: ARCOrderByWithAggregationInput | ARCOrderByWithAggregationInput[]
    by: ARCScalarFieldEnum[] | ARCScalarFieldEnum
    having?: ARCScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ARCCountAggregateInputType | true
    _avg?: ARCAvgAggregateInputType
    _sum?: ARCSumAggregateInputType
    _min?: ARCMinAggregateInputType
    _max?: ARCMaxAggregateInputType
  }

  export type ARCGroupByOutputType = {
    id: number
    userId: number
    arcNumber: string
    residenceStatus: string
    issueDate: Date
    userPhotoUrl: string
    createdAt: Date
    _count: ARCCountAggregateOutputType | null
    _avg: ARCAvgAggregateOutputType | null
    _sum: ARCSumAggregateOutputType | null
    _min: ARCMinAggregateOutputType | null
    _max: ARCMaxAggregateOutputType | null
  }

  type GetARCGroupByPayload<T extends ARCGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ARCGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ARCGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ARCGroupByOutputType[P]>
            : GetScalarType<T[P], ARCGroupByOutputType[P]>
        }
      >
    >


  export type ARCSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    arcNumber?: boolean
    residenceStatus?: boolean
    issueDate?: boolean
    userPhotoUrl?: boolean
    createdAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aRC"]>



  export type ARCSelectScalar = {
    id?: boolean
    userId?: boolean
    arcNumber?: boolean
    residenceStatus?: boolean
    issueDate?: boolean
    userPhotoUrl?: boolean
    createdAt?: boolean
  }

  export type ARCOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "arcNumber" | "residenceStatus" | "issueDate" | "userPhotoUrl" | "createdAt", ExtArgs["result"]["aRC"]>
  export type ARCInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ARCPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ARC"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      arcNumber: string
      residenceStatus: string
      issueDate: Date
      userPhotoUrl: string
      createdAt: Date
    }, ExtArgs["result"]["aRC"]>
    composites: {}
  }

  type ARCGetPayload<S extends boolean | null | undefined | ARCDefaultArgs> = $Result.GetResult<Prisma.$ARCPayload, S>

  type ARCCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ARCFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ARCCountAggregateInputType | true
    }

  export interface ARCDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ARC'], meta: { name: 'ARC' } }
    /**
     * Find zero or one ARC that matches the filter.
     * @param {ARCFindUniqueArgs} args - Arguments to find a ARC
     * @example
     * // Get one ARC
     * const aRC = await prisma.aRC.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ARCFindUniqueArgs>(args: SelectSubset<T, ARCFindUniqueArgs<ExtArgs>>): Prisma__ARCClient<$Result.GetResult<Prisma.$ARCPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ARC that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ARCFindUniqueOrThrowArgs} args - Arguments to find a ARC
     * @example
     * // Get one ARC
     * const aRC = await prisma.aRC.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ARCFindUniqueOrThrowArgs>(args: SelectSubset<T, ARCFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ARCClient<$Result.GetResult<Prisma.$ARCPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ARC that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ARCFindFirstArgs} args - Arguments to find a ARC
     * @example
     * // Get one ARC
     * const aRC = await prisma.aRC.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ARCFindFirstArgs>(args?: SelectSubset<T, ARCFindFirstArgs<ExtArgs>>): Prisma__ARCClient<$Result.GetResult<Prisma.$ARCPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ARC that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ARCFindFirstOrThrowArgs} args - Arguments to find a ARC
     * @example
     * // Get one ARC
     * const aRC = await prisma.aRC.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ARCFindFirstOrThrowArgs>(args?: SelectSubset<T, ARCFindFirstOrThrowArgs<ExtArgs>>): Prisma__ARCClient<$Result.GetResult<Prisma.$ARCPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ARCS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ARCFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ARCS
     * const aRCS = await prisma.aRC.findMany()
     * 
     * // Get first 10 ARCS
     * const aRCS = await prisma.aRC.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aRCWithIdOnly = await prisma.aRC.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ARCFindManyArgs>(args?: SelectSubset<T, ARCFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ARCPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ARC.
     * @param {ARCCreateArgs} args - Arguments to create a ARC.
     * @example
     * // Create one ARC
     * const ARC = await prisma.aRC.create({
     *   data: {
     *     // ... data to create a ARC
     *   }
     * })
     * 
     */
    create<T extends ARCCreateArgs>(args: SelectSubset<T, ARCCreateArgs<ExtArgs>>): Prisma__ARCClient<$Result.GetResult<Prisma.$ARCPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ARCS.
     * @param {ARCCreateManyArgs} args - Arguments to create many ARCS.
     * @example
     * // Create many ARCS
     * const aRC = await prisma.aRC.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ARCCreateManyArgs>(args?: SelectSubset<T, ARCCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ARC.
     * @param {ARCDeleteArgs} args - Arguments to delete one ARC.
     * @example
     * // Delete one ARC
     * const ARC = await prisma.aRC.delete({
     *   where: {
     *     // ... filter to delete one ARC
     *   }
     * })
     * 
     */
    delete<T extends ARCDeleteArgs>(args: SelectSubset<T, ARCDeleteArgs<ExtArgs>>): Prisma__ARCClient<$Result.GetResult<Prisma.$ARCPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ARC.
     * @param {ARCUpdateArgs} args - Arguments to update one ARC.
     * @example
     * // Update one ARC
     * const aRC = await prisma.aRC.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ARCUpdateArgs>(args: SelectSubset<T, ARCUpdateArgs<ExtArgs>>): Prisma__ARCClient<$Result.GetResult<Prisma.$ARCPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ARCS.
     * @param {ARCDeleteManyArgs} args - Arguments to filter ARCS to delete.
     * @example
     * // Delete a few ARCS
     * const { count } = await prisma.aRC.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ARCDeleteManyArgs>(args?: SelectSubset<T, ARCDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ARCS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ARCUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ARCS
     * const aRC = await prisma.aRC.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ARCUpdateManyArgs>(args: SelectSubset<T, ARCUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ARC.
     * @param {ARCUpsertArgs} args - Arguments to update or create a ARC.
     * @example
     * // Update or create a ARC
     * const aRC = await prisma.aRC.upsert({
     *   create: {
     *     // ... data to create a ARC
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ARC we want to update
     *   }
     * })
     */
    upsert<T extends ARCUpsertArgs>(args: SelectSubset<T, ARCUpsertArgs<ExtArgs>>): Prisma__ARCClient<$Result.GetResult<Prisma.$ARCPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ARCS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ARCCountArgs} args - Arguments to filter ARCS to count.
     * @example
     * // Count the number of ARCS
     * const count = await prisma.aRC.count({
     *   where: {
     *     // ... the filter for the ARCS we want to count
     *   }
     * })
    **/
    count<T extends ARCCountArgs>(
      args?: Subset<T, ARCCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ARCCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ARC.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ARCAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ARCAggregateArgs>(args: Subset<T, ARCAggregateArgs>): Prisma.PrismaPromise<GetARCAggregateType<T>>

    /**
     * Group by ARC.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ARCGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ARCGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ARCGroupByArgs['orderBy'] }
        : { orderBy?: ARCGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ARCGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetARCGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ARC model
   */
  readonly fields: ARCFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ARC.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ARCClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ARC model
   */
  interface ARCFieldRefs {
    readonly id: FieldRef<"ARC", 'Int'>
    readonly userId: FieldRef<"ARC", 'Int'>
    readonly arcNumber: FieldRef<"ARC", 'String'>
    readonly residenceStatus: FieldRef<"ARC", 'String'>
    readonly issueDate: FieldRef<"ARC", 'DateTime'>
    readonly userPhotoUrl: FieldRef<"ARC", 'String'>
    readonly createdAt: FieldRef<"ARC", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ARC findUnique
   */
  export type ARCFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ARC
     */
    select?: ARCSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ARC
     */
    omit?: ARCOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ARCInclude<ExtArgs> | null
    /**
     * Filter, which ARC to fetch.
     */
    where: ARCWhereUniqueInput
  }

  /**
   * ARC findUniqueOrThrow
   */
  export type ARCFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ARC
     */
    select?: ARCSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ARC
     */
    omit?: ARCOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ARCInclude<ExtArgs> | null
    /**
     * Filter, which ARC to fetch.
     */
    where: ARCWhereUniqueInput
  }

  /**
   * ARC findFirst
   */
  export type ARCFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ARC
     */
    select?: ARCSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ARC
     */
    omit?: ARCOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ARCInclude<ExtArgs> | null
    /**
     * Filter, which ARC to fetch.
     */
    where?: ARCWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ARCS to fetch.
     */
    orderBy?: ARCOrderByWithRelationInput | ARCOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ARCS.
     */
    cursor?: ARCWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ARCS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ARCS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ARCS.
     */
    distinct?: ARCScalarFieldEnum | ARCScalarFieldEnum[]
  }

  /**
   * ARC findFirstOrThrow
   */
  export type ARCFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ARC
     */
    select?: ARCSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ARC
     */
    omit?: ARCOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ARCInclude<ExtArgs> | null
    /**
     * Filter, which ARC to fetch.
     */
    where?: ARCWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ARCS to fetch.
     */
    orderBy?: ARCOrderByWithRelationInput | ARCOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ARCS.
     */
    cursor?: ARCWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ARCS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ARCS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ARCS.
     */
    distinct?: ARCScalarFieldEnum | ARCScalarFieldEnum[]
  }

  /**
   * ARC findMany
   */
  export type ARCFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ARC
     */
    select?: ARCSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ARC
     */
    omit?: ARCOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ARCInclude<ExtArgs> | null
    /**
     * Filter, which ARCS to fetch.
     */
    where?: ARCWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ARCS to fetch.
     */
    orderBy?: ARCOrderByWithRelationInput | ARCOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ARCS.
     */
    cursor?: ARCWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ARCS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ARCS.
     */
    skip?: number
    distinct?: ARCScalarFieldEnum | ARCScalarFieldEnum[]
  }

  /**
   * ARC create
   */
  export type ARCCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ARC
     */
    select?: ARCSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ARC
     */
    omit?: ARCOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ARCInclude<ExtArgs> | null
    /**
     * The data needed to create a ARC.
     */
    data: XOR<ARCCreateInput, ARCUncheckedCreateInput>
  }

  /**
   * ARC createMany
   */
  export type ARCCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ARCS.
     */
    data: ARCCreateManyInput | ARCCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ARC update
   */
  export type ARCUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ARC
     */
    select?: ARCSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ARC
     */
    omit?: ARCOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ARCInclude<ExtArgs> | null
    /**
     * The data needed to update a ARC.
     */
    data: XOR<ARCUpdateInput, ARCUncheckedUpdateInput>
    /**
     * Choose, which ARC to update.
     */
    where: ARCWhereUniqueInput
  }

  /**
   * ARC updateMany
   */
  export type ARCUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ARCS.
     */
    data: XOR<ARCUpdateManyMutationInput, ARCUncheckedUpdateManyInput>
    /**
     * Filter which ARCS to update
     */
    where?: ARCWhereInput
    /**
     * Limit how many ARCS to update.
     */
    limit?: number
  }

  /**
   * ARC upsert
   */
  export type ARCUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ARC
     */
    select?: ARCSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ARC
     */
    omit?: ARCOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ARCInclude<ExtArgs> | null
    /**
     * The filter to search for the ARC to update in case it exists.
     */
    where: ARCWhereUniqueInput
    /**
     * In case the ARC found by the `where` argument doesn't exist, create a new ARC with this data.
     */
    create: XOR<ARCCreateInput, ARCUncheckedCreateInput>
    /**
     * In case the ARC was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ARCUpdateInput, ARCUncheckedUpdateInput>
  }

  /**
   * ARC delete
   */
  export type ARCDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ARC
     */
    select?: ARCSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ARC
     */
    omit?: ARCOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ARCInclude<ExtArgs> | null
    /**
     * Filter which ARC to delete.
     */
    where: ARCWhereUniqueInput
  }

  /**
   * ARC deleteMany
   */
  export type ARCDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ARCS to delete
     */
    where?: ARCWhereInput
    /**
     * Limit how many ARCS to delete.
     */
    limit?: number
  }

  /**
   * ARC without action
   */
  export type ARCDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ARC
     */
    select?: ARCSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ARC
     */
    omit?: ARCOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ARCInclude<ExtArgs> | null
  }


  /**
   * Model UserDocument
   */

  export type AggregateUserDocument = {
    _count: UserDocumentCountAggregateOutputType | null
    _avg: UserDocumentAvgAggregateOutputType | null
    _sum: UserDocumentSumAggregateOutputType | null
    _min: UserDocumentMinAggregateOutputType | null
    _max: UserDocumentMaxAggregateOutputType | null
  }

  export type UserDocumentAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserDocumentSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserDocumentMinAggregateOutputType = {
    id: number | null
    userId: number | null
    docType: $Enums.DocType | null
    fileUrl: string | null
    createdAt: Date | null
  }

  export type UserDocumentMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    docType: $Enums.DocType | null
    fileUrl: string | null
    createdAt: Date | null
  }

  export type UserDocumentCountAggregateOutputType = {
    id: number
    userId: number
    docType: number
    fileUrl: number
    createdAt: number
    _all: number
  }


  export type UserDocumentAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserDocumentSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserDocumentMinAggregateInputType = {
    id?: true
    userId?: true
    docType?: true
    fileUrl?: true
    createdAt?: true
  }

  export type UserDocumentMaxAggregateInputType = {
    id?: true
    userId?: true
    docType?: true
    fileUrl?: true
    createdAt?: true
  }

  export type UserDocumentCountAggregateInputType = {
    id?: true
    userId?: true
    docType?: true
    fileUrl?: true
    createdAt?: true
    _all?: true
  }

  export type UserDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDocument to aggregate.
     */
    where?: UserDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDocuments to fetch.
     */
    orderBy?: UserDocumentOrderByWithRelationInput | UserDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserDocuments
    **/
    _count?: true | UserDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserDocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserDocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserDocumentMaxAggregateInputType
  }

  export type GetUserDocumentAggregateType<T extends UserDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateUserDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserDocument[P]>
      : GetScalarType<T[P], AggregateUserDocument[P]>
  }




  export type UserDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDocumentWhereInput
    orderBy?: UserDocumentOrderByWithAggregationInput | UserDocumentOrderByWithAggregationInput[]
    by: UserDocumentScalarFieldEnum[] | UserDocumentScalarFieldEnum
    having?: UserDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserDocumentCountAggregateInputType | true
    _avg?: UserDocumentAvgAggregateInputType
    _sum?: UserDocumentSumAggregateInputType
    _min?: UserDocumentMinAggregateInputType
    _max?: UserDocumentMaxAggregateInputType
  }

  export type UserDocumentGroupByOutputType = {
    id: number
    userId: number
    docType: $Enums.DocType
    fileUrl: string
    createdAt: Date
    _count: UserDocumentCountAggregateOutputType | null
    _avg: UserDocumentAvgAggregateOutputType | null
    _sum: UserDocumentSumAggregateOutputType | null
    _min: UserDocumentMinAggregateOutputType | null
    _max: UserDocumentMaxAggregateOutputType | null
  }

  type GetUserDocumentGroupByPayload<T extends UserDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], UserDocumentGroupByOutputType[P]>
        }
      >
    >


  export type UserDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    docType?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDocument"]>



  export type UserDocumentSelectScalar = {
    id?: boolean
    userId?: boolean
    docType?: boolean
    fileUrl?: boolean
    createdAt?: boolean
  }

  export type UserDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "docType" | "fileUrl" | "createdAt", ExtArgs["result"]["userDocument"]>
  export type UserDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserDocument"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      docType: $Enums.DocType
      fileUrl: string
      createdAt: Date
    }, ExtArgs["result"]["userDocument"]>
    composites: {}
  }

  type UserDocumentGetPayload<S extends boolean | null | undefined | UserDocumentDefaultArgs> = $Result.GetResult<Prisma.$UserDocumentPayload, S>

  type UserDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserDocumentCountAggregateInputType | true
    }

  export interface UserDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserDocument'], meta: { name: 'UserDocument' } }
    /**
     * Find zero or one UserDocument that matches the filter.
     * @param {UserDocumentFindUniqueArgs} args - Arguments to find a UserDocument
     * @example
     * // Get one UserDocument
     * const userDocument = await prisma.userDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserDocumentFindUniqueArgs>(args: SelectSubset<T, UserDocumentFindUniqueArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserDocumentFindUniqueOrThrowArgs} args - Arguments to find a UserDocument
     * @example
     * // Get one UserDocument
     * const userDocument = await prisma.userDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, UserDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentFindFirstArgs} args - Arguments to find a UserDocument
     * @example
     * // Get one UserDocument
     * const userDocument = await prisma.userDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserDocumentFindFirstArgs>(args?: SelectSubset<T, UserDocumentFindFirstArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentFindFirstOrThrowArgs} args - Arguments to find a UserDocument
     * @example
     * // Get one UserDocument
     * const userDocument = await prisma.userDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, UserDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserDocuments
     * const userDocuments = await prisma.userDocument.findMany()
     * 
     * // Get first 10 UserDocuments
     * const userDocuments = await prisma.userDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userDocumentWithIdOnly = await prisma.userDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserDocumentFindManyArgs>(args?: SelectSubset<T, UserDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserDocument.
     * @param {UserDocumentCreateArgs} args - Arguments to create a UserDocument.
     * @example
     * // Create one UserDocument
     * const UserDocument = await prisma.userDocument.create({
     *   data: {
     *     // ... data to create a UserDocument
     *   }
     * })
     * 
     */
    create<T extends UserDocumentCreateArgs>(args: SelectSubset<T, UserDocumentCreateArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserDocuments.
     * @param {UserDocumentCreateManyArgs} args - Arguments to create many UserDocuments.
     * @example
     * // Create many UserDocuments
     * const userDocument = await prisma.userDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserDocumentCreateManyArgs>(args?: SelectSubset<T, UserDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserDocument.
     * @param {UserDocumentDeleteArgs} args - Arguments to delete one UserDocument.
     * @example
     * // Delete one UserDocument
     * const UserDocument = await prisma.userDocument.delete({
     *   where: {
     *     // ... filter to delete one UserDocument
     *   }
     * })
     * 
     */
    delete<T extends UserDocumentDeleteArgs>(args: SelectSubset<T, UserDocumentDeleteArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserDocument.
     * @param {UserDocumentUpdateArgs} args - Arguments to update one UserDocument.
     * @example
     * // Update one UserDocument
     * const userDocument = await prisma.userDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserDocumentUpdateArgs>(args: SelectSubset<T, UserDocumentUpdateArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserDocuments.
     * @param {UserDocumentDeleteManyArgs} args - Arguments to filter UserDocuments to delete.
     * @example
     * // Delete a few UserDocuments
     * const { count } = await prisma.userDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDocumentDeleteManyArgs>(args?: SelectSubset<T, UserDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserDocuments
     * const userDocument = await prisma.userDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserDocumentUpdateManyArgs>(args: SelectSubset<T, UserDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserDocument.
     * @param {UserDocumentUpsertArgs} args - Arguments to update or create a UserDocument.
     * @example
     * // Update or create a UserDocument
     * const userDocument = await prisma.userDocument.upsert({
     *   create: {
     *     // ... data to create a UserDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserDocument we want to update
     *   }
     * })
     */
    upsert<T extends UserDocumentUpsertArgs>(args: SelectSubset<T, UserDocumentUpsertArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentCountArgs} args - Arguments to filter UserDocuments to count.
     * @example
     * // Count the number of UserDocuments
     * const count = await prisma.userDocument.count({
     *   where: {
     *     // ... the filter for the UserDocuments we want to count
     *   }
     * })
    **/
    count<T extends UserDocumentCountArgs>(
      args?: Subset<T, UserDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserDocumentAggregateArgs>(args: Subset<T, UserDocumentAggregateArgs>): Prisma.PrismaPromise<GetUserDocumentAggregateType<T>>

    /**
     * Group by UserDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserDocumentGroupByArgs['orderBy'] }
        : { orderBy?: UserDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserDocument model
   */
  readonly fields: UserDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserDocument model
   */
  interface UserDocumentFieldRefs {
    readonly id: FieldRef<"UserDocument", 'Int'>
    readonly userId: FieldRef<"UserDocument", 'Int'>
    readonly docType: FieldRef<"UserDocument", 'DocType'>
    readonly fileUrl: FieldRef<"UserDocument", 'String'>
    readonly createdAt: FieldRef<"UserDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserDocument findUnique
   */
  export type UserDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * Filter, which UserDocument to fetch.
     */
    where: UserDocumentWhereUniqueInput
  }

  /**
   * UserDocument findUniqueOrThrow
   */
  export type UserDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * Filter, which UserDocument to fetch.
     */
    where: UserDocumentWhereUniqueInput
  }

  /**
   * UserDocument findFirst
   */
  export type UserDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * Filter, which UserDocument to fetch.
     */
    where?: UserDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDocuments to fetch.
     */
    orderBy?: UserDocumentOrderByWithRelationInput | UserDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDocuments.
     */
    cursor?: UserDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDocuments.
     */
    distinct?: UserDocumentScalarFieldEnum | UserDocumentScalarFieldEnum[]
  }

  /**
   * UserDocument findFirstOrThrow
   */
  export type UserDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * Filter, which UserDocument to fetch.
     */
    where?: UserDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDocuments to fetch.
     */
    orderBy?: UserDocumentOrderByWithRelationInput | UserDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDocuments.
     */
    cursor?: UserDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDocuments.
     */
    distinct?: UserDocumentScalarFieldEnum | UserDocumentScalarFieldEnum[]
  }

  /**
   * UserDocument findMany
   */
  export type UserDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * Filter, which UserDocuments to fetch.
     */
    where?: UserDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDocuments to fetch.
     */
    orderBy?: UserDocumentOrderByWithRelationInput | UserDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserDocuments.
     */
    cursor?: UserDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDocuments.
     */
    skip?: number
    distinct?: UserDocumentScalarFieldEnum | UserDocumentScalarFieldEnum[]
  }

  /**
   * UserDocument create
   */
  export type UserDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a UserDocument.
     */
    data: XOR<UserDocumentCreateInput, UserDocumentUncheckedCreateInput>
  }

  /**
   * UserDocument createMany
   */
  export type UserDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserDocuments.
     */
    data: UserDocumentCreateManyInput | UserDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserDocument update
   */
  export type UserDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a UserDocument.
     */
    data: XOR<UserDocumentUpdateInput, UserDocumentUncheckedUpdateInput>
    /**
     * Choose, which UserDocument to update.
     */
    where: UserDocumentWhereUniqueInput
  }

  /**
   * UserDocument updateMany
   */
  export type UserDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserDocuments.
     */
    data: XOR<UserDocumentUpdateManyMutationInput, UserDocumentUncheckedUpdateManyInput>
    /**
     * Filter which UserDocuments to update
     */
    where?: UserDocumentWhereInput
    /**
     * Limit how many UserDocuments to update.
     */
    limit?: number
  }

  /**
   * UserDocument upsert
   */
  export type UserDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the UserDocument to update in case it exists.
     */
    where: UserDocumentWhereUniqueInput
    /**
     * In case the UserDocument found by the `where` argument doesn't exist, create a new UserDocument with this data.
     */
    create: XOR<UserDocumentCreateInput, UserDocumentUncheckedCreateInput>
    /**
     * In case the UserDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserDocumentUpdateInput, UserDocumentUncheckedUpdateInput>
  }

  /**
   * UserDocument delete
   */
  export type UserDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * Filter which UserDocument to delete.
     */
    where: UserDocumentWhereUniqueInput
  }

  /**
   * UserDocument deleteMany
   */
  export type UserDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDocuments to delete
     */
    where?: UserDocumentWhereInput
    /**
     * Limit how many UserDocuments to delete.
     */
    limit?: number
  }

  /**
   * UserDocument without action
   */
  export type UserDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
  }


  /**
   * Model UserCard
   */

  export type AggregateUserCard = {
    _count: UserCardCountAggregateOutputType | null
    _avg: UserCardAvgAggregateOutputType | null
    _sum: UserCardSumAggregateOutputType | null
    _min: UserCardMinAggregateOutputType | null
    _max: UserCardMaxAggregateOutputType | null
  }

  export type UserCardAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    balance: Decimal | null
  }

  export type UserCardSumAggregateOutputType = {
    id: number | null
    userId: number | null
    balance: Decimal | null
  }

  export type UserCardMinAggregateOutputType = {
    id: number | null
    userId: number | null
    cardType: $Enums.CardType | null
    cardNumber: string | null
    balance: Decimal | null
    isDefault: boolean | null
    createdAt: Date | null
  }

  export type UserCardMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    cardType: $Enums.CardType | null
    cardNumber: string | null
    balance: Decimal | null
    isDefault: boolean | null
    createdAt: Date | null
  }

  export type UserCardCountAggregateOutputType = {
    id: number
    userId: number
    cardType: number
    cardNumber: number
    balance: number
    isDefault: number
    createdAt: number
    _all: number
  }


  export type UserCardAvgAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
  }

  export type UserCardSumAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
  }

  export type UserCardMinAggregateInputType = {
    id?: true
    userId?: true
    cardType?: true
    cardNumber?: true
    balance?: true
    isDefault?: true
    createdAt?: true
  }

  export type UserCardMaxAggregateInputType = {
    id?: true
    userId?: true
    cardType?: true
    cardNumber?: true
    balance?: true
    isDefault?: true
    createdAt?: true
  }

  export type UserCardCountAggregateInputType = {
    id?: true
    userId?: true
    cardType?: true
    cardNumber?: true
    balance?: true
    isDefault?: true
    createdAt?: true
    _all?: true
  }

  export type UserCardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCard to aggregate.
     */
    where?: UserCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCards to fetch.
     */
    orderBy?: UserCardOrderByWithRelationInput | UserCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserCards
    **/
    _count?: true | UserCardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserCardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserCardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserCardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserCardMaxAggregateInputType
  }

  export type GetUserCardAggregateType<T extends UserCardAggregateArgs> = {
        [P in keyof T & keyof AggregateUserCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserCard[P]>
      : GetScalarType<T[P], AggregateUserCard[P]>
  }




  export type UserCardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCardWhereInput
    orderBy?: UserCardOrderByWithAggregationInput | UserCardOrderByWithAggregationInput[]
    by: UserCardScalarFieldEnum[] | UserCardScalarFieldEnum
    having?: UserCardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCardCountAggregateInputType | true
    _avg?: UserCardAvgAggregateInputType
    _sum?: UserCardSumAggregateInputType
    _min?: UserCardMinAggregateInputType
    _max?: UserCardMaxAggregateInputType
  }

  export type UserCardGroupByOutputType = {
    id: number
    userId: number
    cardType: $Enums.CardType
    cardNumber: string
    balance: Decimal
    isDefault: boolean
    createdAt: Date
    _count: UserCardCountAggregateOutputType | null
    _avg: UserCardAvgAggregateOutputType | null
    _sum: UserCardSumAggregateOutputType | null
    _min: UserCardMinAggregateOutputType | null
    _max: UserCardMaxAggregateOutputType | null
  }

  type GetUserCardGroupByPayload<T extends UserCardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserCardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserCardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserCardGroupByOutputType[P]>
            : GetScalarType<T[P], UserCardGroupByOutputType[P]>
        }
      >
    >


  export type UserCardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cardType?: boolean
    cardNumber?: boolean
    balance?: boolean
    isDefault?: boolean
    createdAt?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCard"]>



  export type UserCardSelectScalar = {
    id?: boolean
    userId?: boolean
    cardType?: boolean
    cardNumber?: boolean
    balance?: boolean
    isDefault?: boolean
    createdAt?: boolean
  }

  export type UserCardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "cardType" | "cardNumber" | "balance" | "isDefault" | "createdAt", ExtArgs["result"]["userCard"]>
  export type UserCardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserCardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserCard"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      cardType: $Enums.CardType
      cardNumber: string
      balance: Prisma.Decimal
      isDefault: boolean
      createdAt: Date
    }, ExtArgs["result"]["userCard"]>
    composites: {}
  }

  type UserCardGetPayload<S extends boolean | null | undefined | UserCardDefaultArgs> = $Result.GetResult<Prisma.$UserCardPayload, S>

  type UserCardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserCardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCardCountAggregateInputType | true
    }

  export interface UserCardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserCard'], meta: { name: 'UserCard' } }
    /**
     * Find zero or one UserCard that matches the filter.
     * @param {UserCardFindUniqueArgs} args - Arguments to find a UserCard
     * @example
     * // Get one UserCard
     * const userCard = await prisma.userCard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserCardFindUniqueArgs>(args: SelectSubset<T, UserCardFindUniqueArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserCard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserCardFindUniqueOrThrowArgs} args - Arguments to find a UserCard
     * @example
     * // Get one UserCard
     * const userCard = await prisma.userCard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserCardFindUniqueOrThrowArgs>(args: SelectSubset<T, UserCardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardFindFirstArgs} args - Arguments to find a UserCard
     * @example
     * // Get one UserCard
     * const userCard = await prisma.userCard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserCardFindFirstArgs>(args?: SelectSubset<T, UserCardFindFirstArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardFindFirstOrThrowArgs} args - Arguments to find a UserCard
     * @example
     * // Get one UserCard
     * const userCard = await prisma.userCard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserCardFindFirstOrThrowArgs>(args?: SelectSubset<T, UserCardFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserCards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserCards
     * const userCards = await prisma.userCard.findMany()
     * 
     * // Get first 10 UserCards
     * const userCards = await prisma.userCard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userCardWithIdOnly = await prisma.userCard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserCardFindManyArgs>(args?: SelectSubset<T, UserCardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserCard.
     * @param {UserCardCreateArgs} args - Arguments to create a UserCard.
     * @example
     * // Create one UserCard
     * const UserCard = await prisma.userCard.create({
     *   data: {
     *     // ... data to create a UserCard
     *   }
     * })
     * 
     */
    create<T extends UserCardCreateArgs>(args: SelectSubset<T, UserCardCreateArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserCards.
     * @param {UserCardCreateManyArgs} args - Arguments to create many UserCards.
     * @example
     * // Create many UserCards
     * const userCard = await prisma.userCard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCardCreateManyArgs>(args?: SelectSubset<T, UserCardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserCard.
     * @param {UserCardDeleteArgs} args - Arguments to delete one UserCard.
     * @example
     * // Delete one UserCard
     * const UserCard = await prisma.userCard.delete({
     *   where: {
     *     // ... filter to delete one UserCard
     *   }
     * })
     * 
     */
    delete<T extends UserCardDeleteArgs>(args: SelectSubset<T, UserCardDeleteArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserCard.
     * @param {UserCardUpdateArgs} args - Arguments to update one UserCard.
     * @example
     * // Update one UserCard
     * const userCard = await prisma.userCard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserCardUpdateArgs>(args: SelectSubset<T, UserCardUpdateArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserCards.
     * @param {UserCardDeleteManyArgs} args - Arguments to filter UserCards to delete.
     * @example
     * // Delete a few UserCards
     * const { count } = await prisma.userCard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserCardDeleteManyArgs>(args?: SelectSubset<T, UserCardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserCards
     * const userCard = await prisma.userCard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserCardUpdateManyArgs>(args: SelectSubset<T, UserCardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserCard.
     * @param {UserCardUpsertArgs} args - Arguments to update or create a UserCard.
     * @example
     * // Update or create a UserCard
     * const userCard = await prisma.userCard.upsert({
     *   create: {
     *     // ... data to create a UserCard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserCard we want to update
     *   }
     * })
     */
    upsert<T extends UserCardUpsertArgs>(args: SelectSubset<T, UserCardUpsertArgs<ExtArgs>>): Prisma__UserCardClient<$Result.GetResult<Prisma.$UserCardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardCountArgs} args - Arguments to filter UserCards to count.
     * @example
     * // Count the number of UserCards
     * const count = await prisma.userCard.count({
     *   where: {
     *     // ... the filter for the UserCards we want to count
     *   }
     * })
    **/
    count<T extends UserCardCountArgs>(
      args?: Subset<T, UserCardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserCardAggregateArgs>(args: Subset<T, UserCardAggregateArgs>): Prisma.PrismaPromise<GetUserCardAggregateType<T>>

    /**
     * Group by UserCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserCardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserCardGroupByArgs['orderBy'] }
        : { orderBy?: UserCardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserCardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserCard model
   */
  readonly fields: UserCardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserCard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserCardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserCard model
   */
  interface UserCardFieldRefs {
    readonly id: FieldRef<"UserCard", 'Int'>
    readonly userId: FieldRef<"UserCard", 'Int'>
    readonly cardType: FieldRef<"UserCard", 'CardType'>
    readonly cardNumber: FieldRef<"UserCard", 'String'>
    readonly balance: FieldRef<"UserCard", 'Decimal'>
    readonly isDefault: FieldRef<"UserCard", 'Boolean'>
    readonly createdAt: FieldRef<"UserCard", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserCard findUnique
   */
  export type UserCardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * Filter, which UserCard to fetch.
     */
    where: UserCardWhereUniqueInput
  }

  /**
   * UserCard findUniqueOrThrow
   */
  export type UserCardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * Filter, which UserCard to fetch.
     */
    where: UserCardWhereUniqueInput
  }

  /**
   * UserCard findFirst
   */
  export type UserCardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * Filter, which UserCard to fetch.
     */
    where?: UserCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCards to fetch.
     */
    orderBy?: UserCardOrderByWithRelationInput | UserCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCards.
     */
    cursor?: UserCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCards.
     */
    distinct?: UserCardScalarFieldEnum | UserCardScalarFieldEnum[]
  }

  /**
   * UserCard findFirstOrThrow
   */
  export type UserCardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * Filter, which UserCard to fetch.
     */
    where?: UserCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCards to fetch.
     */
    orderBy?: UserCardOrderByWithRelationInput | UserCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCards.
     */
    cursor?: UserCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCards.
     */
    distinct?: UserCardScalarFieldEnum | UserCardScalarFieldEnum[]
  }

  /**
   * UserCard findMany
   */
  export type UserCardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * Filter, which UserCards to fetch.
     */
    where?: UserCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCards to fetch.
     */
    orderBy?: UserCardOrderByWithRelationInput | UserCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserCards.
     */
    cursor?: UserCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCards.
     */
    skip?: number
    distinct?: UserCardScalarFieldEnum | UserCardScalarFieldEnum[]
  }

  /**
   * UserCard create
   */
  export type UserCardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * The data needed to create a UserCard.
     */
    data: XOR<UserCardCreateInput, UserCardUncheckedCreateInput>
  }

  /**
   * UserCard createMany
   */
  export type UserCardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserCards.
     */
    data: UserCardCreateManyInput | UserCardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserCard update
   */
  export type UserCardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * The data needed to update a UserCard.
     */
    data: XOR<UserCardUpdateInput, UserCardUncheckedUpdateInput>
    /**
     * Choose, which UserCard to update.
     */
    where: UserCardWhereUniqueInput
  }

  /**
   * UserCard updateMany
   */
  export type UserCardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserCards.
     */
    data: XOR<UserCardUpdateManyMutationInput, UserCardUncheckedUpdateManyInput>
    /**
     * Filter which UserCards to update
     */
    where?: UserCardWhereInput
    /**
     * Limit how many UserCards to update.
     */
    limit?: number
  }

  /**
   * UserCard upsert
   */
  export type UserCardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * The filter to search for the UserCard to update in case it exists.
     */
    where: UserCardWhereUniqueInput
    /**
     * In case the UserCard found by the `where` argument doesn't exist, create a new UserCard with this data.
     */
    create: XOR<UserCardCreateInput, UserCardUncheckedCreateInput>
    /**
     * In case the UserCard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserCardUpdateInput, UserCardUncheckedUpdateInput>
  }

  /**
   * UserCard delete
   */
  export type UserCardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
    /**
     * Filter which UserCard to delete.
     */
    where: UserCardWhereUniqueInput
  }

  /**
   * UserCard deleteMany
   */
  export type UserCardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCards to delete
     */
    where?: UserCardWhereInput
    /**
     * Limit how many UserCards to delete.
     */
    limit?: number
  }

  /**
   * UserCard without action
   */
  export type UserCardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCard
     */
    select?: UserCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCard
     */
    omit?: UserCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCardInclude<ExtArgs> | null
  }


  /**
   * Model Coupon
   */

  export type AggregateCoupon = {
    _count: CouponCountAggregateOutputType | null
    _avg: CouponAvgAggregateOutputType | null
    _sum: CouponSumAggregateOutputType | null
    _min: CouponMinAggregateOutputType | null
    _max: CouponMaxAggregateOutputType | null
  }

  export type CouponAvgAggregateOutputType = {
    id: number | null
    discount: number | null
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type CouponSumAggregateOutputType = {
    id: number | null
    discount: number | null
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type CouponMinAggregateOutputType = {
    id: number | null
    tag: string | null
    discount: number | null
    category: $Enums.CouponCategory | null
    couponCode: string | null
    brandName: string | null
    brandPic: string | null
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type CouponMaxAggregateOutputType = {
    id: number | null
    tag: string | null
    discount: number | null
    category: $Enums.CouponCategory | null
    couponCode: string | null
    brandName: string | null
    brandPic: string | null
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type CouponCountAggregateOutputType = {
    id: number
    tag: number
    discount: number
    category: number
    couponCode: number
    brandName: number
    brandPic: number
    latitude: number
    longitude: number
    _all: number
  }


  export type CouponAvgAggregateInputType = {
    id?: true
    discount?: true
    latitude?: true
    longitude?: true
  }

  export type CouponSumAggregateInputType = {
    id?: true
    discount?: true
    latitude?: true
    longitude?: true
  }

  export type CouponMinAggregateInputType = {
    id?: true
    tag?: true
    discount?: true
    category?: true
    couponCode?: true
    brandName?: true
    brandPic?: true
    latitude?: true
    longitude?: true
  }

  export type CouponMaxAggregateInputType = {
    id?: true
    tag?: true
    discount?: true
    category?: true
    couponCode?: true
    brandName?: true
    brandPic?: true
    latitude?: true
    longitude?: true
  }

  export type CouponCountAggregateInputType = {
    id?: true
    tag?: true
    discount?: true
    category?: true
    couponCode?: true
    brandName?: true
    brandPic?: true
    latitude?: true
    longitude?: true
    _all?: true
  }

  export type CouponAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Coupon to aggregate.
     */
    where?: CouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coupons to fetch.
     */
    orderBy?: CouponOrderByWithRelationInput | CouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coupons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Coupons
    **/
    _count?: true | CouponCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CouponAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CouponSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CouponMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CouponMaxAggregateInputType
  }

  export type GetCouponAggregateType<T extends CouponAggregateArgs> = {
        [P in keyof T & keyof AggregateCoupon]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoupon[P]>
      : GetScalarType<T[P], AggregateCoupon[P]>
  }




  export type CouponGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CouponWhereInput
    orderBy?: CouponOrderByWithAggregationInput | CouponOrderByWithAggregationInput[]
    by: CouponScalarFieldEnum[] | CouponScalarFieldEnum
    having?: CouponScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CouponCountAggregateInputType | true
    _avg?: CouponAvgAggregateInputType
    _sum?: CouponSumAggregateInputType
    _min?: CouponMinAggregateInputType
    _max?: CouponMaxAggregateInputType
  }

  export type CouponGroupByOutputType = {
    id: number
    tag: string | null
    discount: number
    category: $Enums.CouponCategory
    couponCode: string
    brandName: string
    brandPic: string
    latitude: Decimal
    longitude: Decimal
    _count: CouponCountAggregateOutputType | null
    _avg: CouponAvgAggregateOutputType | null
    _sum: CouponSumAggregateOutputType | null
    _min: CouponMinAggregateOutputType | null
    _max: CouponMaxAggregateOutputType | null
  }

  type GetCouponGroupByPayload<T extends CouponGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CouponGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CouponGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CouponGroupByOutputType[P]>
            : GetScalarType<T[P], CouponGroupByOutputType[P]>
        }
      >
    >


  export type CouponSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tag?: boolean
    discount?: boolean
    category?: boolean
    couponCode?: boolean
    brandName?: boolean
    brandPic?: boolean
    latitude?: boolean
    longitude?: boolean
  }, ExtArgs["result"]["coupon"]>



  export type CouponSelectScalar = {
    id?: boolean
    tag?: boolean
    discount?: boolean
    category?: boolean
    couponCode?: boolean
    brandName?: boolean
    brandPic?: boolean
    latitude?: boolean
    longitude?: boolean
  }

  export type CouponOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tag" | "discount" | "category" | "couponCode" | "brandName" | "brandPic" | "latitude" | "longitude", ExtArgs["result"]["coupon"]>

  export type $CouponPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Coupon"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tag: string | null
      discount: number
      category: $Enums.CouponCategory
      couponCode: string
      brandName: string
      brandPic: string
      latitude: Prisma.Decimal
      longitude: Prisma.Decimal
    }, ExtArgs["result"]["coupon"]>
    composites: {}
  }

  type CouponGetPayload<S extends boolean | null | undefined | CouponDefaultArgs> = $Result.GetResult<Prisma.$CouponPayload, S>

  type CouponCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CouponFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CouponCountAggregateInputType | true
    }

  export interface CouponDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Coupon'], meta: { name: 'Coupon' } }
    /**
     * Find zero or one Coupon that matches the filter.
     * @param {CouponFindUniqueArgs} args - Arguments to find a Coupon
     * @example
     * // Get one Coupon
     * const coupon = await prisma.coupon.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CouponFindUniqueArgs>(args: SelectSubset<T, CouponFindUniqueArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Coupon that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CouponFindUniqueOrThrowArgs} args - Arguments to find a Coupon
     * @example
     * // Get one Coupon
     * const coupon = await prisma.coupon.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CouponFindUniqueOrThrowArgs>(args: SelectSubset<T, CouponFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Coupon that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponFindFirstArgs} args - Arguments to find a Coupon
     * @example
     * // Get one Coupon
     * const coupon = await prisma.coupon.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CouponFindFirstArgs>(args?: SelectSubset<T, CouponFindFirstArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Coupon that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponFindFirstOrThrowArgs} args - Arguments to find a Coupon
     * @example
     * // Get one Coupon
     * const coupon = await prisma.coupon.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CouponFindFirstOrThrowArgs>(args?: SelectSubset<T, CouponFindFirstOrThrowArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Coupons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Coupons
     * const coupons = await prisma.coupon.findMany()
     * 
     * // Get first 10 Coupons
     * const coupons = await prisma.coupon.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const couponWithIdOnly = await prisma.coupon.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CouponFindManyArgs>(args?: SelectSubset<T, CouponFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Coupon.
     * @param {CouponCreateArgs} args - Arguments to create a Coupon.
     * @example
     * // Create one Coupon
     * const Coupon = await prisma.coupon.create({
     *   data: {
     *     // ... data to create a Coupon
     *   }
     * })
     * 
     */
    create<T extends CouponCreateArgs>(args: SelectSubset<T, CouponCreateArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Coupons.
     * @param {CouponCreateManyArgs} args - Arguments to create many Coupons.
     * @example
     * // Create many Coupons
     * const coupon = await prisma.coupon.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CouponCreateManyArgs>(args?: SelectSubset<T, CouponCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Coupon.
     * @param {CouponDeleteArgs} args - Arguments to delete one Coupon.
     * @example
     * // Delete one Coupon
     * const Coupon = await prisma.coupon.delete({
     *   where: {
     *     // ... filter to delete one Coupon
     *   }
     * })
     * 
     */
    delete<T extends CouponDeleteArgs>(args: SelectSubset<T, CouponDeleteArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Coupon.
     * @param {CouponUpdateArgs} args - Arguments to update one Coupon.
     * @example
     * // Update one Coupon
     * const coupon = await prisma.coupon.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CouponUpdateArgs>(args: SelectSubset<T, CouponUpdateArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Coupons.
     * @param {CouponDeleteManyArgs} args - Arguments to filter Coupons to delete.
     * @example
     * // Delete a few Coupons
     * const { count } = await prisma.coupon.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CouponDeleteManyArgs>(args?: SelectSubset<T, CouponDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Coupons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Coupons
     * const coupon = await prisma.coupon.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CouponUpdateManyArgs>(args: SelectSubset<T, CouponUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Coupon.
     * @param {CouponUpsertArgs} args - Arguments to update or create a Coupon.
     * @example
     * // Update or create a Coupon
     * const coupon = await prisma.coupon.upsert({
     *   create: {
     *     // ... data to create a Coupon
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Coupon we want to update
     *   }
     * })
     */
    upsert<T extends CouponUpsertArgs>(args: SelectSubset<T, CouponUpsertArgs<ExtArgs>>): Prisma__CouponClient<$Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Coupons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponCountArgs} args - Arguments to filter Coupons to count.
     * @example
     * // Count the number of Coupons
     * const count = await prisma.coupon.count({
     *   where: {
     *     // ... the filter for the Coupons we want to count
     *   }
     * })
    **/
    count<T extends CouponCountArgs>(
      args?: Subset<T, CouponCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CouponCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Coupon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CouponAggregateArgs>(args: Subset<T, CouponAggregateArgs>): Prisma.PrismaPromise<GetCouponAggregateType<T>>

    /**
     * Group by Coupon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CouponGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CouponGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CouponGroupByArgs['orderBy'] }
        : { orderBy?: CouponGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CouponGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCouponGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Coupon model
   */
  readonly fields: CouponFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Coupon.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CouponClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Coupon model
   */
  interface CouponFieldRefs {
    readonly id: FieldRef<"Coupon", 'Int'>
    readonly tag: FieldRef<"Coupon", 'String'>
    readonly discount: FieldRef<"Coupon", 'Int'>
    readonly category: FieldRef<"Coupon", 'CouponCategory'>
    readonly couponCode: FieldRef<"Coupon", 'String'>
    readonly brandName: FieldRef<"Coupon", 'String'>
    readonly brandPic: FieldRef<"Coupon", 'String'>
    readonly latitude: FieldRef<"Coupon", 'Decimal'>
    readonly longitude: FieldRef<"Coupon", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * Coupon findUnique
   */
  export type CouponFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Filter, which Coupon to fetch.
     */
    where: CouponWhereUniqueInput
  }

  /**
   * Coupon findUniqueOrThrow
   */
  export type CouponFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Filter, which Coupon to fetch.
     */
    where: CouponWhereUniqueInput
  }

  /**
   * Coupon findFirst
   */
  export type CouponFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Filter, which Coupon to fetch.
     */
    where?: CouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coupons to fetch.
     */
    orderBy?: CouponOrderByWithRelationInput | CouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Coupons.
     */
    cursor?: CouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coupons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Coupons.
     */
    distinct?: CouponScalarFieldEnum | CouponScalarFieldEnum[]
  }

  /**
   * Coupon findFirstOrThrow
   */
  export type CouponFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Filter, which Coupon to fetch.
     */
    where?: CouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coupons to fetch.
     */
    orderBy?: CouponOrderByWithRelationInput | CouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Coupons.
     */
    cursor?: CouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coupons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Coupons.
     */
    distinct?: CouponScalarFieldEnum | CouponScalarFieldEnum[]
  }

  /**
   * Coupon findMany
   */
  export type CouponFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Filter, which Coupons to fetch.
     */
    where?: CouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coupons to fetch.
     */
    orderBy?: CouponOrderByWithRelationInput | CouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Coupons.
     */
    cursor?: CouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coupons.
     */
    skip?: number
    distinct?: CouponScalarFieldEnum | CouponScalarFieldEnum[]
  }

  /**
   * Coupon create
   */
  export type CouponCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * The data needed to create a Coupon.
     */
    data: XOR<CouponCreateInput, CouponUncheckedCreateInput>
  }

  /**
   * Coupon createMany
   */
  export type CouponCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Coupons.
     */
    data: CouponCreateManyInput | CouponCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Coupon update
   */
  export type CouponUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * The data needed to update a Coupon.
     */
    data: XOR<CouponUpdateInput, CouponUncheckedUpdateInput>
    /**
     * Choose, which Coupon to update.
     */
    where: CouponWhereUniqueInput
  }

  /**
   * Coupon updateMany
   */
  export type CouponUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Coupons.
     */
    data: XOR<CouponUpdateManyMutationInput, CouponUncheckedUpdateManyInput>
    /**
     * Filter which Coupons to update
     */
    where?: CouponWhereInput
    /**
     * Limit how many Coupons to update.
     */
    limit?: number
  }

  /**
   * Coupon upsert
   */
  export type CouponUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * The filter to search for the Coupon to update in case it exists.
     */
    where: CouponWhereUniqueInput
    /**
     * In case the Coupon found by the `where` argument doesn't exist, create a new Coupon with this data.
     */
    create: XOR<CouponCreateInput, CouponUncheckedCreateInput>
    /**
     * In case the Coupon was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CouponUpdateInput, CouponUncheckedUpdateInput>
  }

  /**
   * Coupon delete
   */
  export type CouponDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
    /**
     * Filter which Coupon to delete.
     */
    where: CouponWhereUniqueInput
  }

  /**
   * Coupon deleteMany
   */
  export type CouponDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Coupons to delete
     */
    where?: CouponWhereInput
    /**
     * Limit how many Coupons to delete.
     */
    limit?: number
  }

  /**
   * Coupon without action
   */
  export type CouponDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: CouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coupon
     */
    omit?: CouponOmit<ExtArgs> | null
  }


  /**
   * Model SavedPlace
   */

  export type AggregateSavedPlace = {
    _count: SavedPlaceCountAggregateOutputType | null
    _avg: SavedPlaceAvgAggregateOutputType | null
    _sum: SavedPlaceSumAggregateOutputType | null
    _min: SavedPlaceMinAggregateOutputType | null
    _max: SavedPlaceMaxAggregateOutputType | null
  }

  export type SavedPlaceAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type SavedPlaceSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type SavedPlaceMinAggregateOutputType = {
    id: number | null
    userId: number | null
    placeName: string | null
    category: $Enums.PlaceCategory | null
    latitude: string | null
    longitude: string | null
    address: string | null
    openHours: string | null
    phone: string | null
  }

  export type SavedPlaceMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    placeName: string | null
    category: $Enums.PlaceCategory | null
    latitude: string | null
    longitude: string | null
    address: string | null
    openHours: string | null
    phone: string | null
  }

  export type SavedPlaceCountAggregateOutputType = {
    id: number
    userId: number
    placeName: number
    category: number
    latitude: number
    longitude: number
    address: number
    openHours: number
    phone: number
    _all: number
  }


  export type SavedPlaceAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type SavedPlaceSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type SavedPlaceMinAggregateInputType = {
    id?: true
    userId?: true
    placeName?: true
    category?: true
    latitude?: true
    longitude?: true
    address?: true
    openHours?: true
    phone?: true
  }

  export type SavedPlaceMaxAggregateInputType = {
    id?: true
    userId?: true
    placeName?: true
    category?: true
    latitude?: true
    longitude?: true
    address?: true
    openHours?: true
    phone?: true
  }

  export type SavedPlaceCountAggregateInputType = {
    id?: true
    userId?: true
    placeName?: true
    category?: true
    latitude?: true
    longitude?: true
    address?: true
    openHours?: true
    phone?: true
    _all?: true
  }

  export type SavedPlaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedPlace to aggregate.
     */
    where?: SavedPlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedPlaces to fetch.
     */
    orderBy?: SavedPlaceOrderByWithRelationInput | SavedPlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedPlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedPlaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedPlaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedPlaces
    **/
    _count?: true | SavedPlaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SavedPlaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SavedPlaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedPlaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedPlaceMaxAggregateInputType
  }

  export type GetSavedPlaceAggregateType<T extends SavedPlaceAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedPlace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedPlace[P]>
      : GetScalarType<T[P], AggregateSavedPlace[P]>
  }




  export type SavedPlaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedPlaceWhereInput
    orderBy?: SavedPlaceOrderByWithAggregationInput | SavedPlaceOrderByWithAggregationInput[]
    by: SavedPlaceScalarFieldEnum[] | SavedPlaceScalarFieldEnum
    having?: SavedPlaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedPlaceCountAggregateInputType | true
    _avg?: SavedPlaceAvgAggregateInputType
    _sum?: SavedPlaceSumAggregateInputType
    _min?: SavedPlaceMinAggregateInputType
    _max?: SavedPlaceMaxAggregateInputType
  }

  export type SavedPlaceGroupByOutputType = {
    id: number
    userId: number
    placeName: string
    category: $Enums.PlaceCategory
    latitude: string
    longitude: string
    address: string
    openHours: string
    phone: string
    _count: SavedPlaceCountAggregateOutputType | null
    _avg: SavedPlaceAvgAggregateOutputType | null
    _sum: SavedPlaceSumAggregateOutputType | null
    _min: SavedPlaceMinAggregateOutputType | null
    _max: SavedPlaceMaxAggregateOutputType | null
  }

  type GetSavedPlaceGroupByPayload<T extends SavedPlaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedPlaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedPlaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedPlaceGroupByOutputType[P]>
            : GetScalarType<T[P], SavedPlaceGroupByOutputType[P]>
        }
      >
    >


  export type SavedPlaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    placeName?: boolean
    category?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    openHours?: boolean
    phone?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedPlace"]>



  export type SavedPlaceSelectScalar = {
    id?: boolean
    userId?: boolean
    placeName?: boolean
    category?: boolean
    latitude?: boolean
    longitude?: boolean
    address?: boolean
    openHours?: boolean
    phone?: boolean
  }

  export type SavedPlaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "placeName" | "category" | "latitude" | "longitude" | "address" | "openHours" | "phone", ExtArgs["result"]["savedPlace"]>
  export type SavedPlaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SavedPlacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedPlace"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      placeName: string
      category: $Enums.PlaceCategory
      latitude: string
      longitude: string
      address: string
      openHours: string
      phone: string
    }, ExtArgs["result"]["savedPlace"]>
    composites: {}
  }

  type SavedPlaceGetPayload<S extends boolean | null | undefined | SavedPlaceDefaultArgs> = $Result.GetResult<Prisma.$SavedPlacePayload, S>

  type SavedPlaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SavedPlaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SavedPlaceCountAggregateInputType | true
    }

  export interface SavedPlaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedPlace'], meta: { name: 'SavedPlace' } }
    /**
     * Find zero or one SavedPlace that matches the filter.
     * @param {SavedPlaceFindUniqueArgs} args - Arguments to find a SavedPlace
     * @example
     * // Get one SavedPlace
     * const savedPlace = await prisma.savedPlace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedPlaceFindUniqueArgs>(args: SelectSubset<T, SavedPlaceFindUniqueArgs<ExtArgs>>): Prisma__SavedPlaceClient<$Result.GetResult<Prisma.$SavedPlacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SavedPlace that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SavedPlaceFindUniqueOrThrowArgs} args - Arguments to find a SavedPlace
     * @example
     * // Get one SavedPlace
     * const savedPlace = await prisma.savedPlace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedPlaceFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedPlaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedPlaceClient<$Result.GetResult<Prisma.$SavedPlacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedPlace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPlaceFindFirstArgs} args - Arguments to find a SavedPlace
     * @example
     * // Get one SavedPlace
     * const savedPlace = await prisma.savedPlace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedPlaceFindFirstArgs>(args?: SelectSubset<T, SavedPlaceFindFirstArgs<ExtArgs>>): Prisma__SavedPlaceClient<$Result.GetResult<Prisma.$SavedPlacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedPlace that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPlaceFindFirstOrThrowArgs} args - Arguments to find a SavedPlace
     * @example
     * // Get one SavedPlace
     * const savedPlace = await prisma.savedPlace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedPlaceFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedPlaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedPlaceClient<$Result.GetResult<Prisma.$SavedPlacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SavedPlaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPlaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedPlaces
     * const savedPlaces = await prisma.savedPlace.findMany()
     * 
     * // Get first 10 SavedPlaces
     * const savedPlaces = await prisma.savedPlace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const savedPlaceWithIdOnly = await prisma.savedPlace.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SavedPlaceFindManyArgs>(args?: SelectSubset<T, SavedPlaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedPlacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SavedPlace.
     * @param {SavedPlaceCreateArgs} args - Arguments to create a SavedPlace.
     * @example
     * // Create one SavedPlace
     * const SavedPlace = await prisma.savedPlace.create({
     *   data: {
     *     // ... data to create a SavedPlace
     *   }
     * })
     * 
     */
    create<T extends SavedPlaceCreateArgs>(args: SelectSubset<T, SavedPlaceCreateArgs<ExtArgs>>): Prisma__SavedPlaceClient<$Result.GetResult<Prisma.$SavedPlacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SavedPlaces.
     * @param {SavedPlaceCreateManyArgs} args - Arguments to create many SavedPlaces.
     * @example
     * // Create many SavedPlaces
     * const savedPlace = await prisma.savedPlace.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedPlaceCreateManyArgs>(args?: SelectSubset<T, SavedPlaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SavedPlace.
     * @param {SavedPlaceDeleteArgs} args - Arguments to delete one SavedPlace.
     * @example
     * // Delete one SavedPlace
     * const SavedPlace = await prisma.savedPlace.delete({
     *   where: {
     *     // ... filter to delete one SavedPlace
     *   }
     * })
     * 
     */
    delete<T extends SavedPlaceDeleteArgs>(args: SelectSubset<T, SavedPlaceDeleteArgs<ExtArgs>>): Prisma__SavedPlaceClient<$Result.GetResult<Prisma.$SavedPlacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SavedPlace.
     * @param {SavedPlaceUpdateArgs} args - Arguments to update one SavedPlace.
     * @example
     * // Update one SavedPlace
     * const savedPlace = await prisma.savedPlace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedPlaceUpdateArgs>(args: SelectSubset<T, SavedPlaceUpdateArgs<ExtArgs>>): Prisma__SavedPlaceClient<$Result.GetResult<Prisma.$SavedPlacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SavedPlaces.
     * @param {SavedPlaceDeleteManyArgs} args - Arguments to filter SavedPlaces to delete.
     * @example
     * // Delete a few SavedPlaces
     * const { count } = await prisma.savedPlace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedPlaceDeleteManyArgs>(args?: SelectSubset<T, SavedPlaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedPlaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPlaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedPlaces
     * const savedPlace = await prisma.savedPlace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedPlaceUpdateManyArgs>(args: SelectSubset<T, SavedPlaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SavedPlace.
     * @param {SavedPlaceUpsertArgs} args - Arguments to update or create a SavedPlace.
     * @example
     * // Update or create a SavedPlace
     * const savedPlace = await prisma.savedPlace.upsert({
     *   create: {
     *     // ... data to create a SavedPlace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedPlace we want to update
     *   }
     * })
     */
    upsert<T extends SavedPlaceUpsertArgs>(args: SelectSubset<T, SavedPlaceUpsertArgs<ExtArgs>>): Prisma__SavedPlaceClient<$Result.GetResult<Prisma.$SavedPlacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SavedPlaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPlaceCountArgs} args - Arguments to filter SavedPlaces to count.
     * @example
     * // Count the number of SavedPlaces
     * const count = await prisma.savedPlace.count({
     *   where: {
     *     // ... the filter for the SavedPlaces we want to count
     *   }
     * })
    **/
    count<T extends SavedPlaceCountArgs>(
      args?: Subset<T, SavedPlaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedPlaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedPlace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPlaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedPlaceAggregateArgs>(args: Subset<T, SavedPlaceAggregateArgs>): Prisma.PrismaPromise<GetSavedPlaceAggregateType<T>>

    /**
     * Group by SavedPlace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPlaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedPlaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedPlaceGroupByArgs['orderBy'] }
        : { orderBy?: SavedPlaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedPlaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedPlaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedPlace model
   */
  readonly fields: SavedPlaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedPlace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedPlaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SavedPlace model
   */
  interface SavedPlaceFieldRefs {
    readonly id: FieldRef<"SavedPlace", 'Int'>
    readonly userId: FieldRef<"SavedPlace", 'Int'>
    readonly placeName: FieldRef<"SavedPlace", 'String'>
    readonly category: FieldRef<"SavedPlace", 'PlaceCategory'>
    readonly latitude: FieldRef<"SavedPlace", 'String'>
    readonly longitude: FieldRef<"SavedPlace", 'String'>
    readonly address: FieldRef<"SavedPlace", 'String'>
    readonly openHours: FieldRef<"SavedPlace", 'String'>
    readonly phone: FieldRef<"SavedPlace", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SavedPlace findUnique
   */
  export type SavedPlaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPlace
     */
    select?: SavedPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedPlace
     */
    omit?: SavedPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPlaceInclude<ExtArgs> | null
    /**
     * Filter, which SavedPlace to fetch.
     */
    where: SavedPlaceWhereUniqueInput
  }

  /**
   * SavedPlace findUniqueOrThrow
   */
  export type SavedPlaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPlace
     */
    select?: SavedPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedPlace
     */
    omit?: SavedPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPlaceInclude<ExtArgs> | null
    /**
     * Filter, which SavedPlace to fetch.
     */
    where: SavedPlaceWhereUniqueInput
  }

  /**
   * SavedPlace findFirst
   */
  export type SavedPlaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPlace
     */
    select?: SavedPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedPlace
     */
    omit?: SavedPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPlaceInclude<ExtArgs> | null
    /**
     * Filter, which SavedPlace to fetch.
     */
    where?: SavedPlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedPlaces to fetch.
     */
    orderBy?: SavedPlaceOrderByWithRelationInput | SavedPlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedPlaces.
     */
    cursor?: SavedPlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedPlaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedPlaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedPlaces.
     */
    distinct?: SavedPlaceScalarFieldEnum | SavedPlaceScalarFieldEnum[]
  }

  /**
   * SavedPlace findFirstOrThrow
   */
  export type SavedPlaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPlace
     */
    select?: SavedPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedPlace
     */
    omit?: SavedPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPlaceInclude<ExtArgs> | null
    /**
     * Filter, which SavedPlace to fetch.
     */
    where?: SavedPlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedPlaces to fetch.
     */
    orderBy?: SavedPlaceOrderByWithRelationInput | SavedPlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedPlaces.
     */
    cursor?: SavedPlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedPlaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedPlaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedPlaces.
     */
    distinct?: SavedPlaceScalarFieldEnum | SavedPlaceScalarFieldEnum[]
  }

  /**
   * SavedPlace findMany
   */
  export type SavedPlaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPlace
     */
    select?: SavedPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedPlace
     */
    omit?: SavedPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPlaceInclude<ExtArgs> | null
    /**
     * Filter, which SavedPlaces to fetch.
     */
    where?: SavedPlaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedPlaces to fetch.
     */
    orderBy?: SavedPlaceOrderByWithRelationInput | SavedPlaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedPlaces.
     */
    cursor?: SavedPlaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedPlaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedPlaces.
     */
    skip?: number
    distinct?: SavedPlaceScalarFieldEnum | SavedPlaceScalarFieldEnum[]
  }

  /**
   * SavedPlace create
   */
  export type SavedPlaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPlace
     */
    select?: SavedPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedPlace
     */
    omit?: SavedPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPlaceInclude<ExtArgs> | null
    /**
     * The data needed to create a SavedPlace.
     */
    data: XOR<SavedPlaceCreateInput, SavedPlaceUncheckedCreateInput>
  }

  /**
   * SavedPlace createMany
   */
  export type SavedPlaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedPlaces.
     */
    data: SavedPlaceCreateManyInput | SavedPlaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SavedPlace update
   */
  export type SavedPlaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPlace
     */
    select?: SavedPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedPlace
     */
    omit?: SavedPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPlaceInclude<ExtArgs> | null
    /**
     * The data needed to update a SavedPlace.
     */
    data: XOR<SavedPlaceUpdateInput, SavedPlaceUncheckedUpdateInput>
    /**
     * Choose, which SavedPlace to update.
     */
    where: SavedPlaceWhereUniqueInput
  }

  /**
   * SavedPlace updateMany
   */
  export type SavedPlaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedPlaces.
     */
    data: XOR<SavedPlaceUpdateManyMutationInput, SavedPlaceUncheckedUpdateManyInput>
    /**
     * Filter which SavedPlaces to update
     */
    where?: SavedPlaceWhereInput
    /**
     * Limit how many SavedPlaces to update.
     */
    limit?: number
  }

  /**
   * SavedPlace upsert
   */
  export type SavedPlaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPlace
     */
    select?: SavedPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedPlace
     */
    omit?: SavedPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPlaceInclude<ExtArgs> | null
    /**
     * The filter to search for the SavedPlace to update in case it exists.
     */
    where: SavedPlaceWhereUniqueInput
    /**
     * In case the SavedPlace found by the `where` argument doesn't exist, create a new SavedPlace with this data.
     */
    create: XOR<SavedPlaceCreateInput, SavedPlaceUncheckedCreateInput>
    /**
     * In case the SavedPlace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedPlaceUpdateInput, SavedPlaceUncheckedUpdateInput>
  }

  /**
   * SavedPlace delete
   */
  export type SavedPlaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPlace
     */
    select?: SavedPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedPlace
     */
    omit?: SavedPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPlaceInclude<ExtArgs> | null
    /**
     * Filter which SavedPlace to delete.
     */
    where: SavedPlaceWhereUniqueInput
  }

  /**
   * SavedPlace deleteMany
   */
  export type SavedPlaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedPlaces to delete
     */
    where?: SavedPlaceWhereInput
    /**
     * Limit how many SavedPlaces to delete.
     */
    limit?: number
  }

  /**
   * SavedPlace without action
   */
  export type SavedPlaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedPlace
     */
    select?: SavedPlaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedPlace
     */
    omit?: SavedPlaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedPlaceInclude<ExtArgs> | null
  }


  /**
   * Model Hospital
   */

  export type AggregateHospital = {
    _count: HospitalCountAggregateOutputType | null
    _avg: HospitalAvgAggregateOutputType | null
    _sum: HospitalSumAggregateOutputType | null
    _min: HospitalMinAggregateOutputType | null
    _max: HospitalMaxAggregateOutputType | null
  }

  export type HospitalAvgAggregateOutputType = {
    id: number | null
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type HospitalSumAggregateOutputType = {
    id: number | null
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type HospitalMinAggregateOutputType = {
    id: number | null
    nameKo: string | null
    imageUrl: string | null
    address: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    phone: string | null
    openHours: string | null
  }

  export type HospitalMaxAggregateOutputType = {
    id: number | null
    nameKo: string | null
    imageUrl: string | null
    address: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    phone: string | null
    openHours: string | null
  }

  export type HospitalCountAggregateOutputType = {
    id: number
    nameKo: number
    imageUrl: number
    address: number
    latitude: number
    longitude: number
    phone: number
    openHours: number
    _all: number
  }


  export type HospitalAvgAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
  }

  export type HospitalSumAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
  }

  export type HospitalMinAggregateInputType = {
    id?: true
    nameKo?: true
    imageUrl?: true
    address?: true
    latitude?: true
    longitude?: true
    phone?: true
    openHours?: true
  }

  export type HospitalMaxAggregateInputType = {
    id?: true
    nameKo?: true
    imageUrl?: true
    address?: true
    latitude?: true
    longitude?: true
    phone?: true
    openHours?: true
  }

  export type HospitalCountAggregateInputType = {
    id?: true
    nameKo?: true
    imageUrl?: true
    address?: true
    latitude?: true
    longitude?: true
    phone?: true
    openHours?: true
    _all?: true
  }

  export type HospitalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hospital to aggregate.
     */
    where?: HospitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HospitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hospitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Hospitals
    **/
    _count?: true | HospitalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HospitalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HospitalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HospitalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HospitalMaxAggregateInputType
  }

  export type GetHospitalAggregateType<T extends HospitalAggregateArgs> = {
        [P in keyof T & keyof AggregateHospital]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHospital[P]>
      : GetScalarType<T[P], AggregateHospital[P]>
  }




  export type HospitalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalWhereInput
    orderBy?: HospitalOrderByWithAggregationInput | HospitalOrderByWithAggregationInput[]
    by: HospitalScalarFieldEnum[] | HospitalScalarFieldEnum
    having?: HospitalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HospitalCountAggregateInputType | true
    _avg?: HospitalAvgAggregateInputType
    _sum?: HospitalSumAggregateInputType
    _min?: HospitalMinAggregateInputType
    _max?: HospitalMaxAggregateInputType
  }

  export type HospitalGroupByOutputType = {
    id: number
    nameKo: string
    imageUrl: string | null
    address: string
    latitude: Decimal
    longitude: Decimal
    phone: string | null
    openHours: string
    _count: HospitalCountAggregateOutputType | null
    _avg: HospitalAvgAggregateOutputType | null
    _sum: HospitalSumAggregateOutputType | null
    _min: HospitalMinAggregateOutputType | null
    _max: HospitalMaxAggregateOutputType | null
  }

  type GetHospitalGroupByPayload<T extends HospitalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HospitalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HospitalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HospitalGroupByOutputType[P]>
            : GetScalarType<T[P], HospitalGroupByOutputType[P]>
        }
      >
    >


  export type HospitalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nameKo?: boolean
    imageUrl?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    phone?: boolean
    openHours?: boolean
    HospitalDept?: boolean | Hospital$HospitalDeptArgs<ExtArgs>
    HospitalLang?: boolean | Hospital$HospitalLangArgs<ExtArgs>
    HospitalReview?: boolean | Hospital$HospitalReviewArgs<ExtArgs>
    _count?: boolean | HospitalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hospital"]>



  export type HospitalSelectScalar = {
    id?: boolean
    nameKo?: boolean
    imageUrl?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    phone?: boolean
    openHours?: boolean
  }

  export type HospitalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nameKo" | "imageUrl" | "address" | "latitude" | "longitude" | "phone" | "openHours", ExtArgs["result"]["hospital"]>
  export type HospitalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    HospitalDept?: boolean | Hospital$HospitalDeptArgs<ExtArgs>
    HospitalLang?: boolean | Hospital$HospitalLangArgs<ExtArgs>
    HospitalReview?: boolean | Hospital$HospitalReviewArgs<ExtArgs>
    _count?: boolean | HospitalCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $HospitalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Hospital"
    objects: {
      HospitalDept: Prisma.$HospitalDeptPayload<ExtArgs>[]
      HospitalLang: Prisma.$HospitalLangPayload<ExtArgs>[]
      HospitalReview: Prisma.$HospitalReviewPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nameKo: string
      imageUrl: string | null
      address: string
      latitude: Prisma.Decimal
      longitude: Prisma.Decimal
      phone: string | null
      openHours: string
    }, ExtArgs["result"]["hospital"]>
    composites: {}
  }

  type HospitalGetPayload<S extends boolean | null | undefined | HospitalDefaultArgs> = $Result.GetResult<Prisma.$HospitalPayload, S>

  type HospitalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HospitalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HospitalCountAggregateInputType | true
    }

  export interface HospitalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Hospital'], meta: { name: 'Hospital' } }
    /**
     * Find zero or one Hospital that matches the filter.
     * @param {HospitalFindUniqueArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HospitalFindUniqueArgs>(args: SelectSubset<T, HospitalFindUniqueArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Hospital that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HospitalFindUniqueOrThrowArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HospitalFindUniqueOrThrowArgs>(args: SelectSubset<T, HospitalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hospital that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalFindFirstArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HospitalFindFirstArgs>(args?: SelectSubset<T, HospitalFindFirstArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hospital that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalFindFirstOrThrowArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HospitalFindFirstOrThrowArgs>(args?: SelectSubset<T, HospitalFindFirstOrThrowArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Hospitals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Hospitals
     * const hospitals = await prisma.hospital.findMany()
     * 
     * // Get first 10 Hospitals
     * const hospitals = await prisma.hospital.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hospitalWithIdOnly = await prisma.hospital.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HospitalFindManyArgs>(args?: SelectSubset<T, HospitalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Hospital.
     * @param {HospitalCreateArgs} args - Arguments to create a Hospital.
     * @example
     * // Create one Hospital
     * const Hospital = await prisma.hospital.create({
     *   data: {
     *     // ... data to create a Hospital
     *   }
     * })
     * 
     */
    create<T extends HospitalCreateArgs>(args: SelectSubset<T, HospitalCreateArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Hospitals.
     * @param {HospitalCreateManyArgs} args - Arguments to create many Hospitals.
     * @example
     * // Create many Hospitals
     * const hospital = await prisma.hospital.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HospitalCreateManyArgs>(args?: SelectSubset<T, HospitalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Hospital.
     * @param {HospitalDeleteArgs} args - Arguments to delete one Hospital.
     * @example
     * // Delete one Hospital
     * const Hospital = await prisma.hospital.delete({
     *   where: {
     *     // ... filter to delete one Hospital
     *   }
     * })
     * 
     */
    delete<T extends HospitalDeleteArgs>(args: SelectSubset<T, HospitalDeleteArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Hospital.
     * @param {HospitalUpdateArgs} args - Arguments to update one Hospital.
     * @example
     * // Update one Hospital
     * const hospital = await prisma.hospital.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HospitalUpdateArgs>(args: SelectSubset<T, HospitalUpdateArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Hospitals.
     * @param {HospitalDeleteManyArgs} args - Arguments to filter Hospitals to delete.
     * @example
     * // Delete a few Hospitals
     * const { count } = await prisma.hospital.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HospitalDeleteManyArgs>(args?: SelectSubset<T, HospitalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hospitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Hospitals
     * const hospital = await prisma.hospital.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HospitalUpdateManyArgs>(args: SelectSubset<T, HospitalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Hospital.
     * @param {HospitalUpsertArgs} args - Arguments to update or create a Hospital.
     * @example
     * // Update or create a Hospital
     * const hospital = await prisma.hospital.upsert({
     *   create: {
     *     // ... data to create a Hospital
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hospital we want to update
     *   }
     * })
     */
    upsert<T extends HospitalUpsertArgs>(args: SelectSubset<T, HospitalUpsertArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Hospitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalCountArgs} args - Arguments to filter Hospitals to count.
     * @example
     * // Count the number of Hospitals
     * const count = await prisma.hospital.count({
     *   where: {
     *     // ... the filter for the Hospitals we want to count
     *   }
     * })
    **/
    count<T extends HospitalCountArgs>(
      args?: Subset<T, HospitalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HospitalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Hospital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HospitalAggregateArgs>(args: Subset<T, HospitalAggregateArgs>): Prisma.PrismaPromise<GetHospitalAggregateType<T>>

    /**
     * Group by Hospital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HospitalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HospitalGroupByArgs['orderBy'] }
        : { orderBy?: HospitalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HospitalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHospitalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Hospital model
   */
  readonly fields: HospitalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Hospital.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HospitalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    HospitalDept<T extends Hospital$HospitalDeptArgs<ExtArgs> = {}>(args?: Subset<T, Hospital$HospitalDeptArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalDeptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    HospitalLang<T extends Hospital$HospitalLangArgs<ExtArgs> = {}>(args?: Subset<T, Hospital$HospitalLangArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalLangPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    HospitalReview<T extends Hospital$HospitalReviewArgs<ExtArgs> = {}>(args?: Subset<T, Hospital$HospitalReviewArgs<ExtArgs>>): Prisma__HospitalReviewClient<$Result.GetResult<Prisma.$HospitalReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Hospital model
   */
  interface HospitalFieldRefs {
    readonly id: FieldRef<"Hospital", 'Int'>
    readonly nameKo: FieldRef<"Hospital", 'String'>
    readonly imageUrl: FieldRef<"Hospital", 'String'>
    readonly address: FieldRef<"Hospital", 'String'>
    readonly latitude: FieldRef<"Hospital", 'Decimal'>
    readonly longitude: FieldRef<"Hospital", 'Decimal'>
    readonly phone: FieldRef<"Hospital", 'String'>
    readonly openHours: FieldRef<"Hospital", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Hospital findUnique
   */
  export type HospitalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * Filter, which Hospital to fetch.
     */
    where: HospitalWhereUniqueInput
  }

  /**
   * Hospital findUniqueOrThrow
   */
  export type HospitalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * Filter, which Hospital to fetch.
     */
    where: HospitalWhereUniqueInput
  }

  /**
   * Hospital findFirst
   */
  export type HospitalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * Filter, which Hospital to fetch.
     */
    where?: HospitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hospitals.
     */
    cursor?: HospitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hospitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hospitals.
     */
    distinct?: HospitalScalarFieldEnum | HospitalScalarFieldEnum[]
  }

  /**
   * Hospital findFirstOrThrow
   */
  export type HospitalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * Filter, which Hospital to fetch.
     */
    where?: HospitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hospitals.
     */
    cursor?: HospitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hospitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hospitals.
     */
    distinct?: HospitalScalarFieldEnum | HospitalScalarFieldEnum[]
  }

  /**
   * Hospital findMany
   */
  export type HospitalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * Filter, which Hospitals to fetch.
     */
    where?: HospitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Hospitals.
     */
    cursor?: HospitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hospitals.
     */
    skip?: number
    distinct?: HospitalScalarFieldEnum | HospitalScalarFieldEnum[]
  }

  /**
   * Hospital create
   */
  export type HospitalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * The data needed to create a Hospital.
     */
    data: XOR<HospitalCreateInput, HospitalUncheckedCreateInput>
  }

  /**
   * Hospital createMany
   */
  export type HospitalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Hospitals.
     */
    data: HospitalCreateManyInput | HospitalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hospital update
   */
  export type HospitalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * The data needed to update a Hospital.
     */
    data: XOR<HospitalUpdateInput, HospitalUncheckedUpdateInput>
    /**
     * Choose, which Hospital to update.
     */
    where: HospitalWhereUniqueInput
  }

  /**
   * Hospital updateMany
   */
  export type HospitalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Hospitals.
     */
    data: XOR<HospitalUpdateManyMutationInput, HospitalUncheckedUpdateManyInput>
    /**
     * Filter which Hospitals to update
     */
    where?: HospitalWhereInput
    /**
     * Limit how many Hospitals to update.
     */
    limit?: number
  }

  /**
   * Hospital upsert
   */
  export type HospitalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * The filter to search for the Hospital to update in case it exists.
     */
    where: HospitalWhereUniqueInput
    /**
     * In case the Hospital found by the `where` argument doesn't exist, create a new Hospital with this data.
     */
    create: XOR<HospitalCreateInput, HospitalUncheckedCreateInput>
    /**
     * In case the Hospital was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HospitalUpdateInput, HospitalUncheckedUpdateInput>
  }

  /**
   * Hospital delete
   */
  export type HospitalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
    /**
     * Filter which Hospital to delete.
     */
    where: HospitalWhereUniqueInput
  }

  /**
   * Hospital deleteMany
   */
  export type HospitalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hospitals to delete
     */
    where?: HospitalWhereInput
    /**
     * Limit how many Hospitals to delete.
     */
    limit?: number
  }

  /**
   * Hospital.HospitalDept
   */
  export type Hospital$HospitalDeptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalDept
     */
    select?: HospitalDeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalDept
     */
    omit?: HospitalDeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalDeptInclude<ExtArgs> | null
    where?: HospitalDeptWhereInput
    orderBy?: HospitalDeptOrderByWithRelationInput | HospitalDeptOrderByWithRelationInput[]
    cursor?: HospitalDeptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HospitalDeptScalarFieldEnum | HospitalDeptScalarFieldEnum[]
  }

  /**
   * Hospital.HospitalLang
   */
  export type Hospital$HospitalLangArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalLang
     */
    select?: HospitalLangSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalLang
     */
    omit?: HospitalLangOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalLangInclude<ExtArgs> | null
    where?: HospitalLangWhereInput
    orderBy?: HospitalLangOrderByWithRelationInput | HospitalLangOrderByWithRelationInput[]
    cursor?: HospitalLangWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HospitalLangScalarFieldEnum | HospitalLangScalarFieldEnum[]
  }

  /**
   * Hospital.HospitalReview
   */
  export type Hospital$HospitalReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReview
     */
    select?: HospitalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReview
     */
    omit?: HospitalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalReviewInclude<ExtArgs> | null
    where?: HospitalReviewWhereInput
  }

  /**
   * Hospital without action
   */
  export type HospitalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalInclude<ExtArgs> | null
  }


  /**
   * Model HospitalDept
   */

  export type AggregateHospitalDept = {
    _count: HospitalDeptCountAggregateOutputType | null
    _avg: HospitalDeptAvgAggregateOutputType | null
    _sum: HospitalDeptSumAggregateOutputType | null
    _min: HospitalDeptMinAggregateOutputType | null
    _max: HospitalDeptMaxAggregateOutputType | null
  }

  export type HospitalDeptAvgAggregateOutputType = {
    id: number | null
    hospitalId: number | null
  }

  export type HospitalDeptSumAggregateOutputType = {
    id: number | null
    hospitalId: number | null
  }

  export type HospitalDeptMinAggregateOutputType = {
    id: number | null
    hospitalId: number | null
    deptName: string | null
  }

  export type HospitalDeptMaxAggregateOutputType = {
    id: number | null
    hospitalId: number | null
    deptName: string | null
  }

  export type HospitalDeptCountAggregateOutputType = {
    id: number
    hospitalId: number
    deptName: number
    _all: number
  }


  export type HospitalDeptAvgAggregateInputType = {
    id?: true
    hospitalId?: true
  }

  export type HospitalDeptSumAggregateInputType = {
    id?: true
    hospitalId?: true
  }

  export type HospitalDeptMinAggregateInputType = {
    id?: true
    hospitalId?: true
    deptName?: true
  }

  export type HospitalDeptMaxAggregateInputType = {
    id?: true
    hospitalId?: true
    deptName?: true
  }

  export type HospitalDeptCountAggregateInputType = {
    id?: true
    hospitalId?: true
    deptName?: true
    _all?: true
  }

  export type HospitalDeptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalDept to aggregate.
     */
    where?: HospitalDeptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalDepts to fetch.
     */
    orderBy?: HospitalDeptOrderByWithRelationInput | HospitalDeptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HospitalDeptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalDepts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalDepts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HospitalDepts
    **/
    _count?: true | HospitalDeptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HospitalDeptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HospitalDeptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HospitalDeptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HospitalDeptMaxAggregateInputType
  }

  export type GetHospitalDeptAggregateType<T extends HospitalDeptAggregateArgs> = {
        [P in keyof T & keyof AggregateHospitalDept]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHospitalDept[P]>
      : GetScalarType<T[P], AggregateHospitalDept[P]>
  }




  export type HospitalDeptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalDeptWhereInput
    orderBy?: HospitalDeptOrderByWithAggregationInput | HospitalDeptOrderByWithAggregationInput[]
    by: HospitalDeptScalarFieldEnum[] | HospitalDeptScalarFieldEnum
    having?: HospitalDeptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HospitalDeptCountAggregateInputType | true
    _avg?: HospitalDeptAvgAggregateInputType
    _sum?: HospitalDeptSumAggregateInputType
    _min?: HospitalDeptMinAggregateInputType
    _max?: HospitalDeptMaxAggregateInputType
  }

  export type HospitalDeptGroupByOutputType = {
    id: number
    hospitalId: number
    deptName: string
    _count: HospitalDeptCountAggregateOutputType | null
    _avg: HospitalDeptAvgAggregateOutputType | null
    _sum: HospitalDeptSumAggregateOutputType | null
    _min: HospitalDeptMinAggregateOutputType | null
    _max: HospitalDeptMaxAggregateOutputType | null
  }

  type GetHospitalDeptGroupByPayload<T extends HospitalDeptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HospitalDeptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HospitalDeptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HospitalDeptGroupByOutputType[P]>
            : GetScalarType<T[P], HospitalDeptGroupByOutputType[P]>
        }
      >
    >


  export type HospitalDeptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hospitalId?: boolean
    deptName?: boolean
    Hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hospitalDept"]>



  export type HospitalDeptSelectScalar = {
    id?: boolean
    hospitalId?: boolean
    deptName?: boolean
  }

  export type HospitalDeptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hospitalId" | "deptName", ExtArgs["result"]["hospitalDept"]>
  export type HospitalDeptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }

  export type $HospitalDeptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HospitalDept"
    objects: {
      Hospital: Prisma.$HospitalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      hospitalId: number
      deptName: string
    }, ExtArgs["result"]["hospitalDept"]>
    composites: {}
  }

  type HospitalDeptGetPayload<S extends boolean | null | undefined | HospitalDeptDefaultArgs> = $Result.GetResult<Prisma.$HospitalDeptPayload, S>

  type HospitalDeptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HospitalDeptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HospitalDeptCountAggregateInputType | true
    }

  export interface HospitalDeptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HospitalDept'], meta: { name: 'HospitalDept' } }
    /**
     * Find zero or one HospitalDept that matches the filter.
     * @param {HospitalDeptFindUniqueArgs} args - Arguments to find a HospitalDept
     * @example
     * // Get one HospitalDept
     * const hospitalDept = await prisma.hospitalDept.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HospitalDeptFindUniqueArgs>(args: SelectSubset<T, HospitalDeptFindUniqueArgs<ExtArgs>>): Prisma__HospitalDeptClient<$Result.GetResult<Prisma.$HospitalDeptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HospitalDept that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HospitalDeptFindUniqueOrThrowArgs} args - Arguments to find a HospitalDept
     * @example
     * // Get one HospitalDept
     * const hospitalDept = await prisma.hospitalDept.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HospitalDeptFindUniqueOrThrowArgs>(args: SelectSubset<T, HospitalDeptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HospitalDeptClient<$Result.GetResult<Prisma.$HospitalDeptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HospitalDept that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalDeptFindFirstArgs} args - Arguments to find a HospitalDept
     * @example
     * // Get one HospitalDept
     * const hospitalDept = await prisma.hospitalDept.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HospitalDeptFindFirstArgs>(args?: SelectSubset<T, HospitalDeptFindFirstArgs<ExtArgs>>): Prisma__HospitalDeptClient<$Result.GetResult<Prisma.$HospitalDeptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HospitalDept that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalDeptFindFirstOrThrowArgs} args - Arguments to find a HospitalDept
     * @example
     * // Get one HospitalDept
     * const hospitalDept = await prisma.hospitalDept.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HospitalDeptFindFirstOrThrowArgs>(args?: SelectSubset<T, HospitalDeptFindFirstOrThrowArgs<ExtArgs>>): Prisma__HospitalDeptClient<$Result.GetResult<Prisma.$HospitalDeptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HospitalDepts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalDeptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HospitalDepts
     * const hospitalDepts = await prisma.hospitalDept.findMany()
     * 
     * // Get first 10 HospitalDepts
     * const hospitalDepts = await prisma.hospitalDept.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hospitalDeptWithIdOnly = await prisma.hospitalDept.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HospitalDeptFindManyArgs>(args?: SelectSubset<T, HospitalDeptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalDeptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HospitalDept.
     * @param {HospitalDeptCreateArgs} args - Arguments to create a HospitalDept.
     * @example
     * // Create one HospitalDept
     * const HospitalDept = await prisma.hospitalDept.create({
     *   data: {
     *     // ... data to create a HospitalDept
     *   }
     * })
     * 
     */
    create<T extends HospitalDeptCreateArgs>(args: SelectSubset<T, HospitalDeptCreateArgs<ExtArgs>>): Prisma__HospitalDeptClient<$Result.GetResult<Prisma.$HospitalDeptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HospitalDepts.
     * @param {HospitalDeptCreateManyArgs} args - Arguments to create many HospitalDepts.
     * @example
     * // Create many HospitalDepts
     * const hospitalDept = await prisma.hospitalDept.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HospitalDeptCreateManyArgs>(args?: SelectSubset<T, HospitalDeptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a HospitalDept.
     * @param {HospitalDeptDeleteArgs} args - Arguments to delete one HospitalDept.
     * @example
     * // Delete one HospitalDept
     * const HospitalDept = await prisma.hospitalDept.delete({
     *   where: {
     *     // ... filter to delete one HospitalDept
     *   }
     * })
     * 
     */
    delete<T extends HospitalDeptDeleteArgs>(args: SelectSubset<T, HospitalDeptDeleteArgs<ExtArgs>>): Prisma__HospitalDeptClient<$Result.GetResult<Prisma.$HospitalDeptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HospitalDept.
     * @param {HospitalDeptUpdateArgs} args - Arguments to update one HospitalDept.
     * @example
     * // Update one HospitalDept
     * const hospitalDept = await prisma.hospitalDept.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HospitalDeptUpdateArgs>(args: SelectSubset<T, HospitalDeptUpdateArgs<ExtArgs>>): Prisma__HospitalDeptClient<$Result.GetResult<Prisma.$HospitalDeptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HospitalDepts.
     * @param {HospitalDeptDeleteManyArgs} args - Arguments to filter HospitalDepts to delete.
     * @example
     * // Delete a few HospitalDepts
     * const { count } = await prisma.hospitalDept.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HospitalDeptDeleteManyArgs>(args?: SelectSubset<T, HospitalDeptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HospitalDepts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalDeptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HospitalDepts
     * const hospitalDept = await prisma.hospitalDept.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HospitalDeptUpdateManyArgs>(args: SelectSubset<T, HospitalDeptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HospitalDept.
     * @param {HospitalDeptUpsertArgs} args - Arguments to update or create a HospitalDept.
     * @example
     * // Update or create a HospitalDept
     * const hospitalDept = await prisma.hospitalDept.upsert({
     *   create: {
     *     // ... data to create a HospitalDept
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HospitalDept we want to update
     *   }
     * })
     */
    upsert<T extends HospitalDeptUpsertArgs>(args: SelectSubset<T, HospitalDeptUpsertArgs<ExtArgs>>): Prisma__HospitalDeptClient<$Result.GetResult<Prisma.$HospitalDeptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HospitalDepts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalDeptCountArgs} args - Arguments to filter HospitalDepts to count.
     * @example
     * // Count the number of HospitalDepts
     * const count = await prisma.hospitalDept.count({
     *   where: {
     *     // ... the filter for the HospitalDepts we want to count
     *   }
     * })
    **/
    count<T extends HospitalDeptCountArgs>(
      args?: Subset<T, HospitalDeptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HospitalDeptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HospitalDept.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalDeptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HospitalDeptAggregateArgs>(args: Subset<T, HospitalDeptAggregateArgs>): Prisma.PrismaPromise<GetHospitalDeptAggregateType<T>>

    /**
     * Group by HospitalDept.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalDeptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HospitalDeptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HospitalDeptGroupByArgs['orderBy'] }
        : { orderBy?: HospitalDeptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HospitalDeptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHospitalDeptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HospitalDept model
   */
  readonly fields: HospitalDeptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HospitalDept.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HospitalDeptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Hospital<T extends HospitalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HospitalDefaultArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HospitalDept model
   */
  interface HospitalDeptFieldRefs {
    readonly id: FieldRef<"HospitalDept", 'Int'>
    readonly hospitalId: FieldRef<"HospitalDept", 'Int'>
    readonly deptName: FieldRef<"HospitalDept", 'String'>
  }
    

  // Custom InputTypes
  /**
   * HospitalDept findUnique
   */
  export type HospitalDeptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalDept
     */
    select?: HospitalDeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalDept
     */
    omit?: HospitalDeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalDeptInclude<ExtArgs> | null
    /**
     * Filter, which HospitalDept to fetch.
     */
    where: HospitalDeptWhereUniqueInput
  }

  /**
   * HospitalDept findUniqueOrThrow
   */
  export type HospitalDeptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalDept
     */
    select?: HospitalDeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalDept
     */
    omit?: HospitalDeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalDeptInclude<ExtArgs> | null
    /**
     * Filter, which HospitalDept to fetch.
     */
    where: HospitalDeptWhereUniqueInput
  }

  /**
   * HospitalDept findFirst
   */
  export type HospitalDeptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalDept
     */
    select?: HospitalDeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalDept
     */
    omit?: HospitalDeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalDeptInclude<ExtArgs> | null
    /**
     * Filter, which HospitalDept to fetch.
     */
    where?: HospitalDeptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalDepts to fetch.
     */
    orderBy?: HospitalDeptOrderByWithRelationInput | HospitalDeptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HospitalDepts.
     */
    cursor?: HospitalDeptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalDepts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalDepts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HospitalDepts.
     */
    distinct?: HospitalDeptScalarFieldEnum | HospitalDeptScalarFieldEnum[]
  }

  /**
   * HospitalDept findFirstOrThrow
   */
  export type HospitalDeptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalDept
     */
    select?: HospitalDeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalDept
     */
    omit?: HospitalDeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalDeptInclude<ExtArgs> | null
    /**
     * Filter, which HospitalDept to fetch.
     */
    where?: HospitalDeptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalDepts to fetch.
     */
    orderBy?: HospitalDeptOrderByWithRelationInput | HospitalDeptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HospitalDepts.
     */
    cursor?: HospitalDeptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalDepts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalDepts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HospitalDepts.
     */
    distinct?: HospitalDeptScalarFieldEnum | HospitalDeptScalarFieldEnum[]
  }

  /**
   * HospitalDept findMany
   */
  export type HospitalDeptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalDept
     */
    select?: HospitalDeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalDept
     */
    omit?: HospitalDeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalDeptInclude<ExtArgs> | null
    /**
     * Filter, which HospitalDepts to fetch.
     */
    where?: HospitalDeptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalDepts to fetch.
     */
    orderBy?: HospitalDeptOrderByWithRelationInput | HospitalDeptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HospitalDepts.
     */
    cursor?: HospitalDeptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalDepts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalDepts.
     */
    skip?: number
    distinct?: HospitalDeptScalarFieldEnum | HospitalDeptScalarFieldEnum[]
  }

  /**
   * HospitalDept create
   */
  export type HospitalDeptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalDept
     */
    select?: HospitalDeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalDept
     */
    omit?: HospitalDeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalDeptInclude<ExtArgs> | null
    /**
     * The data needed to create a HospitalDept.
     */
    data: XOR<HospitalDeptCreateInput, HospitalDeptUncheckedCreateInput>
  }

  /**
   * HospitalDept createMany
   */
  export type HospitalDeptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HospitalDepts.
     */
    data: HospitalDeptCreateManyInput | HospitalDeptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HospitalDept update
   */
  export type HospitalDeptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalDept
     */
    select?: HospitalDeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalDept
     */
    omit?: HospitalDeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalDeptInclude<ExtArgs> | null
    /**
     * The data needed to update a HospitalDept.
     */
    data: XOR<HospitalDeptUpdateInput, HospitalDeptUncheckedUpdateInput>
    /**
     * Choose, which HospitalDept to update.
     */
    where: HospitalDeptWhereUniqueInput
  }

  /**
   * HospitalDept updateMany
   */
  export type HospitalDeptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HospitalDepts.
     */
    data: XOR<HospitalDeptUpdateManyMutationInput, HospitalDeptUncheckedUpdateManyInput>
    /**
     * Filter which HospitalDepts to update
     */
    where?: HospitalDeptWhereInput
    /**
     * Limit how many HospitalDepts to update.
     */
    limit?: number
  }

  /**
   * HospitalDept upsert
   */
  export type HospitalDeptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalDept
     */
    select?: HospitalDeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalDept
     */
    omit?: HospitalDeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalDeptInclude<ExtArgs> | null
    /**
     * The filter to search for the HospitalDept to update in case it exists.
     */
    where: HospitalDeptWhereUniqueInput
    /**
     * In case the HospitalDept found by the `where` argument doesn't exist, create a new HospitalDept with this data.
     */
    create: XOR<HospitalDeptCreateInput, HospitalDeptUncheckedCreateInput>
    /**
     * In case the HospitalDept was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HospitalDeptUpdateInput, HospitalDeptUncheckedUpdateInput>
  }

  /**
   * HospitalDept delete
   */
  export type HospitalDeptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalDept
     */
    select?: HospitalDeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalDept
     */
    omit?: HospitalDeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalDeptInclude<ExtArgs> | null
    /**
     * Filter which HospitalDept to delete.
     */
    where: HospitalDeptWhereUniqueInput
  }

  /**
   * HospitalDept deleteMany
   */
  export type HospitalDeptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalDepts to delete
     */
    where?: HospitalDeptWhereInput
    /**
     * Limit how many HospitalDepts to delete.
     */
    limit?: number
  }

  /**
   * HospitalDept without action
   */
  export type HospitalDeptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalDept
     */
    select?: HospitalDeptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalDept
     */
    omit?: HospitalDeptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalDeptInclude<ExtArgs> | null
  }


  /**
   * Model HospitalLang
   */

  export type AggregateHospitalLang = {
    _count: HospitalLangCountAggregateOutputType | null
    _avg: HospitalLangAvgAggregateOutputType | null
    _sum: HospitalLangSumAggregateOutputType | null
    _min: HospitalLangMinAggregateOutputType | null
    _max: HospitalLangMaxAggregateOutputType | null
  }

  export type HospitalLangAvgAggregateOutputType = {
    id: number | null
    hospitalId: number | null
  }

  export type HospitalLangSumAggregateOutputType = {
    id: number | null
    hospitalId: number | null
  }

  export type HospitalLangMinAggregateOutputType = {
    id: number | null
    hospitalId: number | null
    langName: string | null
  }

  export type HospitalLangMaxAggregateOutputType = {
    id: number | null
    hospitalId: number | null
    langName: string | null
  }

  export type HospitalLangCountAggregateOutputType = {
    id: number
    hospitalId: number
    langName: number
    _all: number
  }


  export type HospitalLangAvgAggregateInputType = {
    id?: true
    hospitalId?: true
  }

  export type HospitalLangSumAggregateInputType = {
    id?: true
    hospitalId?: true
  }

  export type HospitalLangMinAggregateInputType = {
    id?: true
    hospitalId?: true
    langName?: true
  }

  export type HospitalLangMaxAggregateInputType = {
    id?: true
    hospitalId?: true
    langName?: true
  }

  export type HospitalLangCountAggregateInputType = {
    id?: true
    hospitalId?: true
    langName?: true
    _all?: true
  }

  export type HospitalLangAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalLang to aggregate.
     */
    where?: HospitalLangWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalLangs to fetch.
     */
    orderBy?: HospitalLangOrderByWithRelationInput | HospitalLangOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HospitalLangWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalLangs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalLangs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HospitalLangs
    **/
    _count?: true | HospitalLangCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HospitalLangAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HospitalLangSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HospitalLangMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HospitalLangMaxAggregateInputType
  }

  export type GetHospitalLangAggregateType<T extends HospitalLangAggregateArgs> = {
        [P in keyof T & keyof AggregateHospitalLang]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHospitalLang[P]>
      : GetScalarType<T[P], AggregateHospitalLang[P]>
  }




  export type HospitalLangGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalLangWhereInput
    orderBy?: HospitalLangOrderByWithAggregationInput | HospitalLangOrderByWithAggregationInput[]
    by: HospitalLangScalarFieldEnum[] | HospitalLangScalarFieldEnum
    having?: HospitalLangScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HospitalLangCountAggregateInputType | true
    _avg?: HospitalLangAvgAggregateInputType
    _sum?: HospitalLangSumAggregateInputType
    _min?: HospitalLangMinAggregateInputType
    _max?: HospitalLangMaxAggregateInputType
  }

  export type HospitalLangGroupByOutputType = {
    id: number
    hospitalId: number
    langName: string
    _count: HospitalLangCountAggregateOutputType | null
    _avg: HospitalLangAvgAggregateOutputType | null
    _sum: HospitalLangSumAggregateOutputType | null
    _min: HospitalLangMinAggregateOutputType | null
    _max: HospitalLangMaxAggregateOutputType | null
  }

  type GetHospitalLangGroupByPayload<T extends HospitalLangGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HospitalLangGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HospitalLangGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HospitalLangGroupByOutputType[P]>
            : GetScalarType<T[P], HospitalLangGroupByOutputType[P]>
        }
      >
    >


  export type HospitalLangSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hospitalId?: boolean
    langName?: boolean
    Hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hospitalLang"]>



  export type HospitalLangSelectScalar = {
    id?: boolean
    hospitalId?: boolean
    langName?: boolean
  }

  export type HospitalLangOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hospitalId" | "langName", ExtArgs["result"]["hospitalLang"]>
  export type HospitalLangInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }

  export type $HospitalLangPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HospitalLang"
    objects: {
      Hospital: Prisma.$HospitalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      hospitalId: number
      langName: string
    }, ExtArgs["result"]["hospitalLang"]>
    composites: {}
  }

  type HospitalLangGetPayload<S extends boolean | null | undefined | HospitalLangDefaultArgs> = $Result.GetResult<Prisma.$HospitalLangPayload, S>

  type HospitalLangCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HospitalLangFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HospitalLangCountAggregateInputType | true
    }

  export interface HospitalLangDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HospitalLang'], meta: { name: 'HospitalLang' } }
    /**
     * Find zero or one HospitalLang that matches the filter.
     * @param {HospitalLangFindUniqueArgs} args - Arguments to find a HospitalLang
     * @example
     * // Get one HospitalLang
     * const hospitalLang = await prisma.hospitalLang.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HospitalLangFindUniqueArgs>(args: SelectSubset<T, HospitalLangFindUniqueArgs<ExtArgs>>): Prisma__HospitalLangClient<$Result.GetResult<Prisma.$HospitalLangPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HospitalLang that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HospitalLangFindUniqueOrThrowArgs} args - Arguments to find a HospitalLang
     * @example
     * // Get one HospitalLang
     * const hospitalLang = await prisma.hospitalLang.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HospitalLangFindUniqueOrThrowArgs>(args: SelectSubset<T, HospitalLangFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HospitalLangClient<$Result.GetResult<Prisma.$HospitalLangPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HospitalLang that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalLangFindFirstArgs} args - Arguments to find a HospitalLang
     * @example
     * // Get one HospitalLang
     * const hospitalLang = await prisma.hospitalLang.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HospitalLangFindFirstArgs>(args?: SelectSubset<T, HospitalLangFindFirstArgs<ExtArgs>>): Prisma__HospitalLangClient<$Result.GetResult<Prisma.$HospitalLangPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HospitalLang that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalLangFindFirstOrThrowArgs} args - Arguments to find a HospitalLang
     * @example
     * // Get one HospitalLang
     * const hospitalLang = await prisma.hospitalLang.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HospitalLangFindFirstOrThrowArgs>(args?: SelectSubset<T, HospitalLangFindFirstOrThrowArgs<ExtArgs>>): Prisma__HospitalLangClient<$Result.GetResult<Prisma.$HospitalLangPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HospitalLangs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalLangFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HospitalLangs
     * const hospitalLangs = await prisma.hospitalLang.findMany()
     * 
     * // Get first 10 HospitalLangs
     * const hospitalLangs = await prisma.hospitalLang.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hospitalLangWithIdOnly = await prisma.hospitalLang.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HospitalLangFindManyArgs>(args?: SelectSubset<T, HospitalLangFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalLangPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HospitalLang.
     * @param {HospitalLangCreateArgs} args - Arguments to create a HospitalLang.
     * @example
     * // Create one HospitalLang
     * const HospitalLang = await prisma.hospitalLang.create({
     *   data: {
     *     // ... data to create a HospitalLang
     *   }
     * })
     * 
     */
    create<T extends HospitalLangCreateArgs>(args: SelectSubset<T, HospitalLangCreateArgs<ExtArgs>>): Prisma__HospitalLangClient<$Result.GetResult<Prisma.$HospitalLangPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HospitalLangs.
     * @param {HospitalLangCreateManyArgs} args - Arguments to create many HospitalLangs.
     * @example
     * // Create many HospitalLangs
     * const hospitalLang = await prisma.hospitalLang.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HospitalLangCreateManyArgs>(args?: SelectSubset<T, HospitalLangCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a HospitalLang.
     * @param {HospitalLangDeleteArgs} args - Arguments to delete one HospitalLang.
     * @example
     * // Delete one HospitalLang
     * const HospitalLang = await prisma.hospitalLang.delete({
     *   where: {
     *     // ... filter to delete one HospitalLang
     *   }
     * })
     * 
     */
    delete<T extends HospitalLangDeleteArgs>(args: SelectSubset<T, HospitalLangDeleteArgs<ExtArgs>>): Prisma__HospitalLangClient<$Result.GetResult<Prisma.$HospitalLangPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HospitalLang.
     * @param {HospitalLangUpdateArgs} args - Arguments to update one HospitalLang.
     * @example
     * // Update one HospitalLang
     * const hospitalLang = await prisma.hospitalLang.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HospitalLangUpdateArgs>(args: SelectSubset<T, HospitalLangUpdateArgs<ExtArgs>>): Prisma__HospitalLangClient<$Result.GetResult<Prisma.$HospitalLangPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HospitalLangs.
     * @param {HospitalLangDeleteManyArgs} args - Arguments to filter HospitalLangs to delete.
     * @example
     * // Delete a few HospitalLangs
     * const { count } = await prisma.hospitalLang.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HospitalLangDeleteManyArgs>(args?: SelectSubset<T, HospitalLangDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HospitalLangs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalLangUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HospitalLangs
     * const hospitalLang = await prisma.hospitalLang.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HospitalLangUpdateManyArgs>(args: SelectSubset<T, HospitalLangUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HospitalLang.
     * @param {HospitalLangUpsertArgs} args - Arguments to update or create a HospitalLang.
     * @example
     * // Update or create a HospitalLang
     * const hospitalLang = await prisma.hospitalLang.upsert({
     *   create: {
     *     // ... data to create a HospitalLang
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HospitalLang we want to update
     *   }
     * })
     */
    upsert<T extends HospitalLangUpsertArgs>(args: SelectSubset<T, HospitalLangUpsertArgs<ExtArgs>>): Prisma__HospitalLangClient<$Result.GetResult<Prisma.$HospitalLangPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HospitalLangs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalLangCountArgs} args - Arguments to filter HospitalLangs to count.
     * @example
     * // Count the number of HospitalLangs
     * const count = await prisma.hospitalLang.count({
     *   where: {
     *     // ... the filter for the HospitalLangs we want to count
     *   }
     * })
    **/
    count<T extends HospitalLangCountArgs>(
      args?: Subset<T, HospitalLangCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HospitalLangCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HospitalLang.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalLangAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HospitalLangAggregateArgs>(args: Subset<T, HospitalLangAggregateArgs>): Prisma.PrismaPromise<GetHospitalLangAggregateType<T>>

    /**
     * Group by HospitalLang.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalLangGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HospitalLangGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HospitalLangGroupByArgs['orderBy'] }
        : { orderBy?: HospitalLangGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HospitalLangGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHospitalLangGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HospitalLang model
   */
  readonly fields: HospitalLangFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HospitalLang.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HospitalLangClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Hospital<T extends HospitalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HospitalDefaultArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HospitalLang model
   */
  interface HospitalLangFieldRefs {
    readonly id: FieldRef<"HospitalLang", 'Int'>
    readonly hospitalId: FieldRef<"HospitalLang", 'Int'>
    readonly langName: FieldRef<"HospitalLang", 'String'>
  }
    

  // Custom InputTypes
  /**
   * HospitalLang findUnique
   */
  export type HospitalLangFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalLang
     */
    select?: HospitalLangSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalLang
     */
    omit?: HospitalLangOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalLangInclude<ExtArgs> | null
    /**
     * Filter, which HospitalLang to fetch.
     */
    where: HospitalLangWhereUniqueInput
  }

  /**
   * HospitalLang findUniqueOrThrow
   */
  export type HospitalLangFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalLang
     */
    select?: HospitalLangSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalLang
     */
    omit?: HospitalLangOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalLangInclude<ExtArgs> | null
    /**
     * Filter, which HospitalLang to fetch.
     */
    where: HospitalLangWhereUniqueInput
  }

  /**
   * HospitalLang findFirst
   */
  export type HospitalLangFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalLang
     */
    select?: HospitalLangSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalLang
     */
    omit?: HospitalLangOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalLangInclude<ExtArgs> | null
    /**
     * Filter, which HospitalLang to fetch.
     */
    where?: HospitalLangWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalLangs to fetch.
     */
    orderBy?: HospitalLangOrderByWithRelationInput | HospitalLangOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HospitalLangs.
     */
    cursor?: HospitalLangWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalLangs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalLangs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HospitalLangs.
     */
    distinct?: HospitalLangScalarFieldEnum | HospitalLangScalarFieldEnum[]
  }

  /**
   * HospitalLang findFirstOrThrow
   */
  export type HospitalLangFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalLang
     */
    select?: HospitalLangSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalLang
     */
    omit?: HospitalLangOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalLangInclude<ExtArgs> | null
    /**
     * Filter, which HospitalLang to fetch.
     */
    where?: HospitalLangWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalLangs to fetch.
     */
    orderBy?: HospitalLangOrderByWithRelationInput | HospitalLangOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HospitalLangs.
     */
    cursor?: HospitalLangWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalLangs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalLangs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HospitalLangs.
     */
    distinct?: HospitalLangScalarFieldEnum | HospitalLangScalarFieldEnum[]
  }

  /**
   * HospitalLang findMany
   */
  export type HospitalLangFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalLang
     */
    select?: HospitalLangSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalLang
     */
    omit?: HospitalLangOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalLangInclude<ExtArgs> | null
    /**
     * Filter, which HospitalLangs to fetch.
     */
    where?: HospitalLangWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalLangs to fetch.
     */
    orderBy?: HospitalLangOrderByWithRelationInput | HospitalLangOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HospitalLangs.
     */
    cursor?: HospitalLangWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalLangs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalLangs.
     */
    skip?: number
    distinct?: HospitalLangScalarFieldEnum | HospitalLangScalarFieldEnum[]
  }

  /**
   * HospitalLang create
   */
  export type HospitalLangCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalLang
     */
    select?: HospitalLangSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalLang
     */
    omit?: HospitalLangOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalLangInclude<ExtArgs> | null
    /**
     * The data needed to create a HospitalLang.
     */
    data: XOR<HospitalLangCreateInput, HospitalLangUncheckedCreateInput>
  }

  /**
   * HospitalLang createMany
   */
  export type HospitalLangCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HospitalLangs.
     */
    data: HospitalLangCreateManyInput | HospitalLangCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HospitalLang update
   */
  export type HospitalLangUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalLang
     */
    select?: HospitalLangSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalLang
     */
    omit?: HospitalLangOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalLangInclude<ExtArgs> | null
    /**
     * The data needed to update a HospitalLang.
     */
    data: XOR<HospitalLangUpdateInput, HospitalLangUncheckedUpdateInput>
    /**
     * Choose, which HospitalLang to update.
     */
    where: HospitalLangWhereUniqueInput
  }

  /**
   * HospitalLang updateMany
   */
  export type HospitalLangUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HospitalLangs.
     */
    data: XOR<HospitalLangUpdateManyMutationInput, HospitalLangUncheckedUpdateManyInput>
    /**
     * Filter which HospitalLangs to update
     */
    where?: HospitalLangWhereInput
    /**
     * Limit how many HospitalLangs to update.
     */
    limit?: number
  }

  /**
   * HospitalLang upsert
   */
  export type HospitalLangUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalLang
     */
    select?: HospitalLangSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalLang
     */
    omit?: HospitalLangOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalLangInclude<ExtArgs> | null
    /**
     * The filter to search for the HospitalLang to update in case it exists.
     */
    where: HospitalLangWhereUniqueInput
    /**
     * In case the HospitalLang found by the `where` argument doesn't exist, create a new HospitalLang with this data.
     */
    create: XOR<HospitalLangCreateInput, HospitalLangUncheckedCreateInput>
    /**
     * In case the HospitalLang was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HospitalLangUpdateInput, HospitalLangUncheckedUpdateInput>
  }

  /**
   * HospitalLang delete
   */
  export type HospitalLangDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalLang
     */
    select?: HospitalLangSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalLang
     */
    omit?: HospitalLangOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalLangInclude<ExtArgs> | null
    /**
     * Filter which HospitalLang to delete.
     */
    where: HospitalLangWhereUniqueInput
  }

  /**
   * HospitalLang deleteMany
   */
  export type HospitalLangDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalLangs to delete
     */
    where?: HospitalLangWhereInput
    /**
     * Limit how many HospitalLangs to delete.
     */
    limit?: number
  }

  /**
   * HospitalLang without action
   */
  export type HospitalLangDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalLang
     */
    select?: HospitalLangSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalLang
     */
    omit?: HospitalLangOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalLangInclude<ExtArgs> | null
  }


  /**
   * Model HospitalReview
   */

  export type AggregateHospitalReview = {
    _count: HospitalReviewCountAggregateOutputType | null
    _avg: HospitalReviewAvgAggregateOutputType | null
    _sum: HospitalReviewSumAggregateOutputType | null
    _min: HospitalReviewMinAggregateOutputType | null
    _max: HospitalReviewMaxAggregateOutputType | null
  }

  export type HospitalReviewAvgAggregateOutputType = {
    id: number | null
    hospitalId: number | null
  }

  export type HospitalReviewSumAggregateOutputType = {
    id: number | null
    hospitalId: number | null
  }

  export type HospitalReviewMinAggregateOutputType = {
    id: number | null
    hospitalId: number | null
    aiSummary: string | null
  }

  export type HospitalReviewMaxAggregateOutputType = {
    id: number | null
    hospitalId: number | null
    aiSummary: string | null
  }

  export type HospitalReviewCountAggregateOutputType = {
    id: number
    hospitalId: number
    aiSummary: number
    _all: number
  }


  export type HospitalReviewAvgAggregateInputType = {
    id?: true
    hospitalId?: true
  }

  export type HospitalReviewSumAggregateInputType = {
    id?: true
    hospitalId?: true
  }

  export type HospitalReviewMinAggregateInputType = {
    id?: true
    hospitalId?: true
    aiSummary?: true
  }

  export type HospitalReviewMaxAggregateInputType = {
    id?: true
    hospitalId?: true
    aiSummary?: true
  }

  export type HospitalReviewCountAggregateInputType = {
    id?: true
    hospitalId?: true
    aiSummary?: true
    _all?: true
  }

  export type HospitalReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalReview to aggregate.
     */
    where?: HospitalReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalReviews to fetch.
     */
    orderBy?: HospitalReviewOrderByWithRelationInput | HospitalReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HospitalReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HospitalReviews
    **/
    _count?: true | HospitalReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HospitalReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HospitalReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HospitalReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HospitalReviewMaxAggregateInputType
  }

  export type GetHospitalReviewAggregateType<T extends HospitalReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateHospitalReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHospitalReview[P]>
      : GetScalarType<T[P], AggregateHospitalReview[P]>
  }




  export type HospitalReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalReviewWhereInput
    orderBy?: HospitalReviewOrderByWithAggregationInput | HospitalReviewOrderByWithAggregationInput[]
    by: HospitalReviewScalarFieldEnum[] | HospitalReviewScalarFieldEnum
    having?: HospitalReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HospitalReviewCountAggregateInputType | true
    _avg?: HospitalReviewAvgAggregateInputType
    _sum?: HospitalReviewSumAggregateInputType
    _min?: HospitalReviewMinAggregateInputType
    _max?: HospitalReviewMaxAggregateInputType
  }

  export type HospitalReviewGroupByOutputType = {
    id: number
    hospitalId: number
    aiSummary: string
    _count: HospitalReviewCountAggregateOutputType | null
    _avg: HospitalReviewAvgAggregateOutputType | null
    _sum: HospitalReviewSumAggregateOutputType | null
    _min: HospitalReviewMinAggregateOutputType | null
    _max: HospitalReviewMaxAggregateOutputType | null
  }

  type GetHospitalReviewGroupByPayload<T extends HospitalReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HospitalReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HospitalReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HospitalReviewGroupByOutputType[P]>
            : GetScalarType<T[P], HospitalReviewGroupByOutputType[P]>
        }
      >
    >


  export type HospitalReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hospitalId?: boolean
    aiSummary?: boolean
    Hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hospitalReview"]>



  export type HospitalReviewSelectScalar = {
    id?: boolean
    hospitalId?: boolean
    aiSummary?: boolean
  }

  export type HospitalReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hospitalId" | "aiSummary", ExtArgs["result"]["hospitalReview"]>
  export type HospitalReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Hospital?: boolean | HospitalDefaultArgs<ExtArgs>
  }

  export type $HospitalReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HospitalReview"
    objects: {
      Hospital: Prisma.$HospitalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      hospitalId: number
      aiSummary: string
    }, ExtArgs["result"]["hospitalReview"]>
    composites: {}
  }

  type HospitalReviewGetPayload<S extends boolean | null | undefined | HospitalReviewDefaultArgs> = $Result.GetResult<Prisma.$HospitalReviewPayload, S>

  type HospitalReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HospitalReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HospitalReviewCountAggregateInputType | true
    }

  export interface HospitalReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HospitalReview'], meta: { name: 'HospitalReview' } }
    /**
     * Find zero or one HospitalReview that matches the filter.
     * @param {HospitalReviewFindUniqueArgs} args - Arguments to find a HospitalReview
     * @example
     * // Get one HospitalReview
     * const hospitalReview = await prisma.hospitalReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HospitalReviewFindUniqueArgs>(args: SelectSubset<T, HospitalReviewFindUniqueArgs<ExtArgs>>): Prisma__HospitalReviewClient<$Result.GetResult<Prisma.$HospitalReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HospitalReview that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HospitalReviewFindUniqueOrThrowArgs} args - Arguments to find a HospitalReview
     * @example
     * // Get one HospitalReview
     * const hospitalReview = await prisma.hospitalReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HospitalReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, HospitalReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HospitalReviewClient<$Result.GetResult<Prisma.$HospitalReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HospitalReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReviewFindFirstArgs} args - Arguments to find a HospitalReview
     * @example
     * // Get one HospitalReview
     * const hospitalReview = await prisma.hospitalReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HospitalReviewFindFirstArgs>(args?: SelectSubset<T, HospitalReviewFindFirstArgs<ExtArgs>>): Prisma__HospitalReviewClient<$Result.GetResult<Prisma.$HospitalReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HospitalReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReviewFindFirstOrThrowArgs} args - Arguments to find a HospitalReview
     * @example
     * // Get one HospitalReview
     * const hospitalReview = await prisma.hospitalReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HospitalReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, HospitalReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__HospitalReviewClient<$Result.GetResult<Prisma.$HospitalReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HospitalReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HospitalReviews
     * const hospitalReviews = await prisma.hospitalReview.findMany()
     * 
     * // Get first 10 HospitalReviews
     * const hospitalReviews = await prisma.hospitalReview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hospitalReviewWithIdOnly = await prisma.hospitalReview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HospitalReviewFindManyArgs>(args?: SelectSubset<T, HospitalReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HospitalReview.
     * @param {HospitalReviewCreateArgs} args - Arguments to create a HospitalReview.
     * @example
     * // Create one HospitalReview
     * const HospitalReview = await prisma.hospitalReview.create({
     *   data: {
     *     // ... data to create a HospitalReview
     *   }
     * })
     * 
     */
    create<T extends HospitalReviewCreateArgs>(args: SelectSubset<T, HospitalReviewCreateArgs<ExtArgs>>): Prisma__HospitalReviewClient<$Result.GetResult<Prisma.$HospitalReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HospitalReviews.
     * @param {HospitalReviewCreateManyArgs} args - Arguments to create many HospitalReviews.
     * @example
     * // Create many HospitalReviews
     * const hospitalReview = await prisma.hospitalReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HospitalReviewCreateManyArgs>(args?: SelectSubset<T, HospitalReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a HospitalReview.
     * @param {HospitalReviewDeleteArgs} args - Arguments to delete one HospitalReview.
     * @example
     * // Delete one HospitalReview
     * const HospitalReview = await prisma.hospitalReview.delete({
     *   where: {
     *     // ... filter to delete one HospitalReview
     *   }
     * })
     * 
     */
    delete<T extends HospitalReviewDeleteArgs>(args: SelectSubset<T, HospitalReviewDeleteArgs<ExtArgs>>): Prisma__HospitalReviewClient<$Result.GetResult<Prisma.$HospitalReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HospitalReview.
     * @param {HospitalReviewUpdateArgs} args - Arguments to update one HospitalReview.
     * @example
     * // Update one HospitalReview
     * const hospitalReview = await prisma.hospitalReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HospitalReviewUpdateArgs>(args: SelectSubset<T, HospitalReviewUpdateArgs<ExtArgs>>): Prisma__HospitalReviewClient<$Result.GetResult<Prisma.$HospitalReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HospitalReviews.
     * @param {HospitalReviewDeleteManyArgs} args - Arguments to filter HospitalReviews to delete.
     * @example
     * // Delete a few HospitalReviews
     * const { count } = await prisma.hospitalReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HospitalReviewDeleteManyArgs>(args?: SelectSubset<T, HospitalReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HospitalReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HospitalReviews
     * const hospitalReview = await prisma.hospitalReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HospitalReviewUpdateManyArgs>(args: SelectSubset<T, HospitalReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HospitalReview.
     * @param {HospitalReviewUpsertArgs} args - Arguments to update or create a HospitalReview.
     * @example
     * // Update or create a HospitalReview
     * const hospitalReview = await prisma.hospitalReview.upsert({
     *   create: {
     *     // ... data to create a HospitalReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HospitalReview we want to update
     *   }
     * })
     */
    upsert<T extends HospitalReviewUpsertArgs>(args: SelectSubset<T, HospitalReviewUpsertArgs<ExtArgs>>): Prisma__HospitalReviewClient<$Result.GetResult<Prisma.$HospitalReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HospitalReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReviewCountArgs} args - Arguments to filter HospitalReviews to count.
     * @example
     * // Count the number of HospitalReviews
     * const count = await prisma.hospitalReview.count({
     *   where: {
     *     // ... the filter for the HospitalReviews we want to count
     *   }
     * })
    **/
    count<T extends HospitalReviewCountArgs>(
      args?: Subset<T, HospitalReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HospitalReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HospitalReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HospitalReviewAggregateArgs>(args: Subset<T, HospitalReviewAggregateArgs>): Prisma.PrismaPromise<GetHospitalReviewAggregateType<T>>

    /**
     * Group by HospitalReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HospitalReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HospitalReviewGroupByArgs['orderBy'] }
        : { orderBy?: HospitalReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HospitalReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHospitalReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HospitalReview model
   */
  readonly fields: HospitalReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HospitalReview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HospitalReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Hospital<T extends HospitalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HospitalDefaultArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HospitalReview model
   */
  interface HospitalReviewFieldRefs {
    readonly id: FieldRef<"HospitalReview", 'Int'>
    readonly hospitalId: FieldRef<"HospitalReview", 'Int'>
    readonly aiSummary: FieldRef<"HospitalReview", 'String'>
  }
    

  // Custom InputTypes
  /**
   * HospitalReview findUnique
   */
  export type HospitalReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReview
     */
    select?: HospitalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReview
     */
    omit?: HospitalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalReviewInclude<ExtArgs> | null
    /**
     * Filter, which HospitalReview to fetch.
     */
    where: HospitalReviewWhereUniqueInput
  }

  /**
   * HospitalReview findUniqueOrThrow
   */
  export type HospitalReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReview
     */
    select?: HospitalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReview
     */
    omit?: HospitalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalReviewInclude<ExtArgs> | null
    /**
     * Filter, which HospitalReview to fetch.
     */
    where: HospitalReviewWhereUniqueInput
  }

  /**
   * HospitalReview findFirst
   */
  export type HospitalReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReview
     */
    select?: HospitalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReview
     */
    omit?: HospitalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalReviewInclude<ExtArgs> | null
    /**
     * Filter, which HospitalReview to fetch.
     */
    where?: HospitalReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalReviews to fetch.
     */
    orderBy?: HospitalReviewOrderByWithRelationInput | HospitalReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HospitalReviews.
     */
    cursor?: HospitalReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HospitalReviews.
     */
    distinct?: HospitalReviewScalarFieldEnum | HospitalReviewScalarFieldEnum[]
  }

  /**
   * HospitalReview findFirstOrThrow
   */
  export type HospitalReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReview
     */
    select?: HospitalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReview
     */
    omit?: HospitalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalReviewInclude<ExtArgs> | null
    /**
     * Filter, which HospitalReview to fetch.
     */
    where?: HospitalReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalReviews to fetch.
     */
    orderBy?: HospitalReviewOrderByWithRelationInput | HospitalReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HospitalReviews.
     */
    cursor?: HospitalReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HospitalReviews.
     */
    distinct?: HospitalReviewScalarFieldEnum | HospitalReviewScalarFieldEnum[]
  }

  /**
   * HospitalReview findMany
   */
  export type HospitalReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReview
     */
    select?: HospitalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReview
     */
    omit?: HospitalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalReviewInclude<ExtArgs> | null
    /**
     * Filter, which HospitalReviews to fetch.
     */
    where?: HospitalReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HospitalReviews to fetch.
     */
    orderBy?: HospitalReviewOrderByWithRelationInput | HospitalReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HospitalReviews.
     */
    cursor?: HospitalReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HospitalReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HospitalReviews.
     */
    skip?: number
    distinct?: HospitalReviewScalarFieldEnum | HospitalReviewScalarFieldEnum[]
  }

  /**
   * HospitalReview create
   */
  export type HospitalReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReview
     */
    select?: HospitalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReview
     */
    omit?: HospitalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a HospitalReview.
     */
    data: XOR<HospitalReviewCreateInput, HospitalReviewUncheckedCreateInput>
  }

  /**
   * HospitalReview createMany
   */
  export type HospitalReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HospitalReviews.
     */
    data: HospitalReviewCreateManyInput | HospitalReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HospitalReview update
   */
  export type HospitalReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReview
     */
    select?: HospitalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReview
     */
    omit?: HospitalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a HospitalReview.
     */
    data: XOR<HospitalReviewUpdateInput, HospitalReviewUncheckedUpdateInput>
    /**
     * Choose, which HospitalReview to update.
     */
    where: HospitalReviewWhereUniqueInput
  }

  /**
   * HospitalReview updateMany
   */
  export type HospitalReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HospitalReviews.
     */
    data: XOR<HospitalReviewUpdateManyMutationInput, HospitalReviewUncheckedUpdateManyInput>
    /**
     * Filter which HospitalReviews to update
     */
    where?: HospitalReviewWhereInput
    /**
     * Limit how many HospitalReviews to update.
     */
    limit?: number
  }

  /**
   * HospitalReview upsert
   */
  export type HospitalReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReview
     */
    select?: HospitalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReview
     */
    omit?: HospitalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the HospitalReview to update in case it exists.
     */
    where: HospitalReviewWhereUniqueInput
    /**
     * In case the HospitalReview found by the `where` argument doesn't exist, create a new HospitalReview with this data.
     */
    create: XOR<HospitalReviewCreateInput, HospitalReviewUncheckedCreateInput>
    /**
     * In case the HospitalReview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HospitalReviewUpdateInput, HospitalReviewUncheckedUpdateInput>
  }

  /**
   * HospitalReview delete
   */
  export type HospitalReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReview
     */
    select?: HospitalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReview
     */
    omit?: HospitalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalReviewInclude<ExtArgs> | null
    /**
     * Filter which HospitalReview to delete.
     */
    where: HospitalReviewWhereUniqueInput
  }

  /**
   * HospitalReview deleteMany
   */
  export type HospitalReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HospitalReviews to delete
     */
    where?: HospitalReviewWhereInput
    /**
     * Limit how many HospitalReviews to delete.
     */
    limit?: number
  }

  /**
   * HospitalReview without action
   */
  export type HospitalReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HospitalReview
     */
    select?: HospitalReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HospitalReview
     */
    omit?: HospitalReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HospitalReviewInclude<ExtArgs> | null
  }


  /**
   * Model Embassy
   */

  export type AggregateEmbassy = {
    _count: EmbassyCountAggregateOutputType | null
    _avg: EmbassyAvgAggregateOutputType | null
    _sum: EmbassySumAggregateOutputType | null
    _min: EmbassyMinAggregateOutputType | null
    _max: EmbassyMaxAggregateOutputType | null
  }

  export type EmbassyAvgAggregateOutputType = {
    id: number | null
  }

  export type EmbassySumAggregateOutputType = {
    id: number | null
  }

  export type EmbassyMinAggregateOutputType = {
    id: number | null
    nationality: string | null
    placeName: string | null
    address: string | null
    openHours: string | null
    phone: string | null
  }

  export type EmbassyMaxAggregateOutputType = {
    id: number | null
    nationality: string | null
    placeName: string | null
    address: string | null
    openHours: string | null
    phone: string | null
  }

  export type EmbassyCountAggregateOutputType = {
    id: number
    nationality: number
    placeName: number
    address: number
    openHours: number
    phone: number
    _all: number
  }


  export type EmbassyAvgAggregateInputType = {
    id?: true
  }

  export type EmbassySumAggregateInputType = {
    id?: true
  }

  export type EmbassyMinAggregateInputType = {
    id?: true
    nationality?: true
    placeName?: true
    address?: true
    openHours?: true
    phone?: true
  }

  export type EmbassyMaxAggregateInputType = {
    id?: true
    nationality?: true
    placeName?: true
    address?: true
    openHours?: true
    phone?: true
  }

  export type EmbassyCountAggregateInputType = {
    id?: true
    nationality?: true
    placeName?: true
    address?: true
    openHours?: true
    phone?: true
    _all?: true
  }

  export type EmbassyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Embassy to aggregate.
     */
    where?: EmbassyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Embassies to fetch.
     */
    orderBy?: EmbassyOrderByWithRelationInput | EmbassyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmbassyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Embassies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Embassies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Embassies
    **/
    _count?: true | EmbassyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmbassyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmbassySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmbassyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmbassyMaxAggregateInputType
  }

  export type GetEmbassyAggregateType<T extends EmbassyAggregateArgs> = {
        [P in keyof T & keyof AggregateEmbassy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmbassy[P]>
      : GetScalarType<T[P], AggregateEmbassy[P]>
  }




  export type EmbassyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmbassyWhereInput
    orderBy?: EmbassyOrderByWithAggregationInput | EmbassyOrderByWithAggregationInput[]
    by: EmbassyScalarFieldEnum[] | EmbassyScalarFieldEnum
    having?: EmbassyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmbassyCountAggregateInputType | true
    _avg?: EmbassyAvgAggregateInputType
    _sum?: EmbassySumAggregateInputType
    _min?: EmbassyMinAggregateInputType
    _max?: EmbassyMaxAggregateInputType
  }

  export type EmbassyGroupByOutputType = {
    id: number
    nationality: string
    placeName: string
    address: string
    openHours: string
    phone: string
    _count: EmbassyCountAggregateOutputType | null
    _avg: EmbassyAvgAggregateOutputType | null
    _sum: EmbassySumAggregateOutputType | null
    _min: EmbassyMinAggregateOutputType | null
    _max: EmbassyMaxAggregateOutputType | null
  }

  type GetEmbassyGroupByPayload<T extends EmbassyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmbassyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmbassyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmbassyGroupByOutputType[P]>
            : GetScalarType<T[P], EmbassyGroupByOutputType[P]>
        }
      >
    >


  export type EmbassySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nationality?: boolean
    placeName?: boolean
    address?: boolean
    openHours?: boolean
    phone?: boolean
  }, ExtArgs["result"]["embassy"]>



  export type EmbassySelectScalar = {
    id?: boolean
    nationality?: boolean
    placeName?: boolean
    address?: boolean
    openHours?: boolean
    phone?: boolean
  }

  export type EmbassyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nationality" | "placeName" | "address" | "openHours" | "phone", ExtArgs["result"]["embassy"]>

  export type $EmbassyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Embassy"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nationality: string
      placeName: string
      address: string
      openHours: string
      phone: string
    }, ExtArgs["result"]["embassy"]>
    composites: {}
  }

  type EmbassyGetPayload<S extends boolean | null | undefined | EmbassyDefaultArgs> = $Result.GetResult<Prisma.$EmbassyPayload, S>

  type EmbassyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmbassyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmbassyCountAggregateInputType | true
    }

  export interface EmbassyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Embassy'], meta: { name: 'Embassy' } }
    /**
     * Find zero or one Embassy that matches the filter.
     * @param {EmbassyFindUniqueArgs} args - Arguments to find a Embassy
     * @example
     * // Get one Embassy
     * const embassy = await prisma.embassy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmbassyFindUniqueArgs>(args: SelectSubset<T, EmbassyFindUniqueArgs<ExtArgs>>): Prisma__EmbassyClient<$Result.GetResult<Prisma.$EmbassyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Embassy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmbassyFindUniqueOrThrowArgs} args - Arguments to find a Embassy
     * @example
     * // Get one Embassy
     * const embassy = await prisma.embassy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmbassyFindUniqueOrThrowArgs>(args: SelectSubset<T, EmbassyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmbassyClient<$Result.GetResult<Prisma.$EmbassyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Embassy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbassyFindFirstArgs} args - Arguments to find a Embassy
     * @example
     * // Get one Embassy
     * const embassy = await prisma.embassy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmbassyFindFirstArgs>(args?: SelectSubset<T, EmbassyFindFirstArgs<ExtArgs>>): Prisma__EmbassyClient<$Result.GetResult<Prisma.$EmbassyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Embassy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbassyFindFirstOrThrowArgs} args - Arguments to find a Embassy
     * @example
     * // Get one Embassy
     * const embassy = await prisma.embassy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmbassyFindFirstOrThrowArgs>(args?: SelectSubset<T, EmbassyFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmbassyClient<$Result.GetResult<Prisma.$EmbassyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Embassies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbassyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Embassies
     * const embassies = await prisma.embassy.findMany()
     * 
     * // Get first 10 Embassies
     * const embassies = await prisma.embassy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const embassyWithIdOnly = await prisma.embassy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmbassyFindManyArgs>(args?: SelectSubset<T, EmbassyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbassyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Embassy.
     * @param {EmbassyCreateArgs} args - Arguments to create a Embassy.
     * @example
     * // Create one Embassy
     * const Embassy = await prisma.embassy.create({
     *   data: {
     *     // ... data to create a Embassy
     *   }
     * })
     * 
     */
    create<T extends EmbassyCreateArgs>(args: SelectSubset<T, EmbassyCreateArgs<ExtArgs>>): Prisma__EmbassyClient<$Result.GetResult<Prisma.$EmbassyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Embassies.
     * @param {EmbassyCreateManyArgs} args - Arguments to create many Embassies.
     * @example
     * // Create many Embassies
     * const embassy = await prisma.embassy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmbassyCreateManyArgs>(args?: SelectSubset<T, EmbassyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Embassy.
     * @param {EmbassyDeleteArgs} args - Arguments to delete one Embassy.
     * @example
     * // Delete one Embassy
     * const Embassy = await prisma.embassy.delete({
     *   where: {
     *     // ... filter to delete one Embassy
     *   }
     * })
     * 
     */
    delete<T extends EmbassyDeleteArgs>(args: SelectSubset<T, EmbassyDeleteArgs<ExtArgs>>): Prisma__EmbassyClient<$Result.GetResult<Prisma.$EmbassyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Embassy.
     * @param {EmbassyUpdateArgs} args - Arguments to update one Embassy.
     * @example
     * // Update one Embassy
     * const embassy = await prisma.embassy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmbassyUpdateArgs>(args: SelectSubset<T, EmbassyUpdateArgs<ExtArgs>>): Prisma__EmbassyClient<$Result.GetResult<Prisma.$EmbassyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Embassies.
     * @param {EmbassyDeleteManyArgs} args - Arguments to filter Embassies to delete.
     * @example
     * // Delete a few Embassies
     * const { count } = await prisma.embassy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmbassyDeleteManyArgs>(args?: SelectSubset<T, EmbassyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Embassies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbassyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Embassies
     * const embassy = await prisma.embassy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmbassyUpdateManyArgs>(args: SelectSubset<T, EmbassyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Embassy.
     * @param {EmbassyUpsertArgs} args - Arguments to update or create a Embassy.
     * @example
     * // Update or create a Embassy
     * const embassy = await prisma.embassy.upsert({
     *   create: {
     *     // ... data to create a Embassy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Embassy we want to update
     *   }
     * })
     */
    upsert<T extends EmbassyUpsertArgs>(args: SelectSubset<T, EmbassyUpsertArgs<ExtArgs>>): Prisma__EmbassyClient<$Result.GetResult<Prisma.$EmbassyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Embassies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbassyCountArgs} args - Arguments to filter Embassies to count.
     * @example
     * // Count the number of Embassies
     * const count = await prisma.embassy.count({
     *   where: {
     *     // ... the filter for the Embassies we want to count
     *   }
     * })
    **/
    count<T extends EmbassyCountArgs>(
      args?: Subset<T, EmbassyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmbassyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Embassy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbassyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmbassyAggregateArgs>(args: Subset<T, EmbassyAggregateArgs>): Prisma.PrismaPromise<GetEmbassyAggregateType<T>>

    /**
     * Group by Embassy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbassyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmbassyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmbassyGroupByArgs['orderBy'] }
        : { orderBy?: EmbassyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmbassyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmbassyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Embassy model
   */
  readonly fields: EmbassyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Embassy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmbassyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Embassy model
   */
  interface EmbassyFieldRefs {
    readonly id: FieldRef<"Embassy", 'Int'>
    readonly nationality: FieldRef<"Embassy", 'String'>
    readonly placeName: FieldRef<"Embassy", 'String'>
    readonly address: FieldRef<"Embassy", 'String'>
    readonly openHours: FieldRef<"Embassy", 'String'>
    readonly phone: FieldRef<"Embassy", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Embassy findUnique
   */
  export type EmbassyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embassy
     */
    select?: EmbassySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embassy
     */
    omit?: EmbassyOmit<ExtArgs> | null
    /**
     * Filter, which Embassy to fetch.
     */
    where: EmbassyWhereUniqueInput
  }

  /**
   * Embassy findUniqueOrThrow
   */
  export type EmbassyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embassy
     */
    select?: EmbassySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embassy
     */
    omit?: EmbassyOmit<ExtArgs> | null
    /**
     * Filter, which Embassy to fetch.
     */
    where: EmbassyWhereUniqueInput
  }

  /**
   * Embassy findFirst
   */
  export type EmbassyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embassy
     */
    select?: EmbassySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embassy
     */
    omit?: EmbassyOmit<ExtArgs> | null
    /**
     * Filter, which Embassy to fetch.
     */
    where?: EmbassyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Embassies to fetch.
     */
    orderBy?: EmbassyOrderByWithRelationInput | EmbassyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Embassies.
     */
    cursor?: EmbassyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Embassies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Embassies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Embassies.
     */
    distinct?: EmbassyScalarFieldEnum | EmbassyScalarFieldEnum[]
  }

  /**
   * Embassy findFirstOrThrow
   */
  export type EmbassyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embassy
     */
    select?: EmbassySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embassy
     */
    omit?: EmbassyOmit<ExtArgs> | null
    /**
     * Filter, which Embassy to fetch.
     */
    where?: EmbassyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Embassies to fetch.
     */
    orderBy?: EmbassyOrderByWithRelationInput | EmbassyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Embassies.
     */
    cursor?: EmbassyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Embassies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Embassies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Embassies.
     */
    distinct?: EmbassyScalarFieldEnum | EmbassyScalarFieldEnum[]
  }

  /**
   * Embassy findMany
   */
  export type EmbassyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embassy
     */
    select?: EmbassySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embassy
     */
    omit?: EmbassyOmit<ExtArgs> | null
    /**
     * Filter, which Embassies to fetch.
     */
    where?: EmbassyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Embassies to fetch.
     */
    orderBy?: EmbassyOrderByWithRelationInput | EmbassyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Embassies.
     */
    cursor?: EmbassyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Embassies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Embassies.
     */
    skip?: number
    distinct?: EmbassyScalarFieldEnum | EmbassyScalarFieldEnum[]
  }

  /**
   * Embassy create
   */
  export type EmbassyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embassy
     */
    select?: EmbassySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embassy
     */
    omit?: EmbassyOmit<ExtArgs> | null
    /**
     * The data needed to create a Embassy.
     */
    data: XOR<EmbassyCreateInput, EmbassyUncheckedCreateInput>
  }

  /**
   * Embassy createMany
   */
  export type EmbassyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Embassies.
     */
    data: EmbassyCreateManyInput | EmbassyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Embassy update
   */
  export type EmbassyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embassy
     */
    select?: EmbassySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embassy
     */
    omit?: EmbassyOmit<ExtArgs> | null
    /**
     * The data needed to update a Embassy.
     */
    data: XOR<EmbassyUpdateInput, EmbassyUncheckedUpdateInput>
    /**
     * Choose, which Embassy to update.
     */
    where: EmbassyWhereUniqueInput
  }

  /**
   * Embassy updateMany
   */
  export type EmbassyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Embassies.
     */
    data: XOR<EmbassyUpdateManyMutationInput, EmbassyUncheckedUpdateManyInput>
    /**
     * Filter which Embassies to update
     */
    where?: EmbassyWhereInput
    /**
     * Limit how many Embassies to update.
     */
    limit?: number
  }

  /**
   * Embassy upsert
   */
  export type EmbassyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embassy
     */
    select?: EmbassySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embassy
     */
    omit?: EmbassyOmit<ExtArgs> | null
    /**
     * The filter to search for the Embassy to update in case it exists.
     */
    where: EmbassyWhereUniqueInput
    /**
     * In case the Embassy found by the `where` argument doesn't exist, create a new Embassy with this data.
     */
    create: XOR<EmbassyCreateInput, EmbassyUncheckedCreateInput>
    /**
     * In case the Embassy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmbassyUpdateInput, EmbassyUncheckedUpdateInput>
  }

  /**
   * Embassy delete
   */
  export type EmbassyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embassy
     */
    select?: EmbassySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embassy
     */
    omit?: EmbassyOmit<ExtArgs> | null
    /**
     * Filter which Embassy to delete.
     */
    where: EmbassyWhereUniqueInput
  }

  /**
   * Embassy deleteMany
   */
  export type EmbassyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Embassies to delete
     */
    where?: EmbassyWhereInput
    /**
     * Limit how many Embassies to delete.
     */
    limit?: number
  }

  /**
   * Embassy without action
   */
  export type EmbassyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embassy
     */
    select?: EmbassySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embassy
     */
    omit?: EmbassyOmit<ExtArgs> | null
  }


  /**
   * Model SymptomMapping
   */

  export type AggregateSymptomMapping = {
    _count: SymptomMappingCountAggregateOutputType | null
    _avg: SymptomMappingAvgAggregateOutputType | null
    _sum: SymptomMappingSumAggregateOutputType | null
    _min: SymptomMappingMinAggregateOutputType | null
    _max: SymptomMappingMaxAggregateOutputType | null
  }

  export type SymptomMappingAvgAggregateOutputType = {
    id: number | null
  }

  export type SymptomMappingSumAggregateOutputType = {
    id: number | null
  }

  export type SymptomMappingMinAggregateOutputType = {
    id: number | null
    keyword: string | null
    synonyms: string | null
    deptName: string | null
    bodyPart: string | null
  }

  export type SymptomMappingMaxAggregateOutputType = {
    id: number | null
    keyword: string | null
    synonyms: string | null
    deptName: string | null
    bodyPart: string | null
  }

  export type SymptomMappingCountAggregateOutputType = {
    id: number
    keyword: number
    synonyms: number
    deptName: number
    bodyPart: number
    _all: number
  }


  export type SymptomMappingAvgAggregateInputType = {
    id?: true
  }

  export type SymptomMappingSumAggregateInputType = {
    id?: true
  }

  export type SymptomMappingMinAggregateInputType = {
    id?: true
    keyword?: true
    synonyms?: true
    deptName?: true
    bodyPart?: true
  }

  export type SymptomMappingMaxAggregateInputType = {
    id?: true
    keyword?: true
    synonyms?: true
    deptName?: true
    bodyPart?: true
  }

  export type SymptomMappingCountAggregateInputType = {
    id?: true
    keyword?: true
    synonyms?: true
    deptName?: true
    bodyPart?: true
    _all?: true
  }

  export type SymptomMappingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SymptomMapping to aggregate.
     */
    where?: SymptomMappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SymptomMappings to fetch.
     */
    orderBy?: SymptomMappingOrderByWithRelationInput | SymptomMappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SymptomMappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SymptomMappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SymptomMappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SymptomMappings
    **/
    _count?: true | SymptomMappingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SymptomMappingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SymptomMappingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SymptomMappingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SymptomMappingMaxAggregateInputType
  }

  export type GetSymptomMappingAggregateType<T extends SymptomMappingAggregateArgs> = {
        [P in keyof T & keyof AggregateSymptomMapping]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSymptomMapping[P]>
      : GetScalarType<T[P], AggregateSymptomMapping[P]>
  }




  export type SymptomMappingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SymptomMappingWhereInput
    orderBy?: SymptomMappingOrderByWithAggregationInput | SymptomMappingOrderByWithAggregationInput[]
    by: SymptomMappingScalarFieldEnum[] | SymptomMappingScalarFieldEnum
    having?: SymptomMappingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SymptomMappingCountAggregateInputType | true
    _avg?: SymptomMappingAvgAggregateInputType
    _sum?: SymptomMappingSumAggregateInputType
    _min?: SymptomMappingMinAggregateInputType
    _max?: SymptomMappingMaxAggregateInputType
  }

  export type SymptomMappingGroupByOutputType = {
    id: number
    keyword: string
    synonyms: string
    deptName: string
    bodyPart: string
    _count: SymptomMappingCountAggregateOutputType | null
    _avg: SymptomMappingAvgAggregateOutputType | null
    _sum: SymptomMappingSumAggregateOutputType | null
    _min: SymptomMappingMinAggregateOutputType | null
    _max: SymptomMappingMaxAggregateOutputType | null
  }

  type GetSymptomMappingGroupByPayload<T extends SymptomMappingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SymptomMappingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SymptomMappingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SymptomMappingGroupByOutputType[P]>
            : GetScalarType<T[P], SymptomMappingGroupByOutputType[P]>
        }
      >
    >


  export type SymptomMappingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    keyword?: boolean
    synonyms?: boolean
    deptName?: boolean
    bodyPart?: boolean
  }, ExtArgs["result"]["symptomMapping"]>



  export type SymptomMappingSelectScalar = {
    id?: boolean
    keyword?: boolean
    synonyms?: boolean
    deptName?: boolean
    bodyPart?: boolean
  }

  export type SymptomMappingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "keyword" | "synonyms" | "deptName" | "bodyPart", ExtArgs["result"]["symptomMapping"]>

  export type $SymptomMappingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SymptomMapping"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      keyword: string
      synonyms: string
      deptName: string
      bodyPart: string
    }, ExtArgs["result"]["symptomMapping"]>
    composites: {}
  }

  type SymptomMappingGetPayload<S extends boolean | null | undefined | SymptomMappingDefaultArgs> = $Result.GetResult<Prisma.$SymptomMappingPayload, S>

  type SymptomMappingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SymptomMappingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SymptomMappingCountAggregateInputType | true
    }

  export interface SymptomMappingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SymptomMapping'], meta: { name: 'SymptomMapping' } }
    /**
     * Find zero or one SymptomMapping that matches the filter.
     * @param {SymptomMappingFindUniqueArgs} args - Arguments to find a SymptomMapping
     * @example
     * // Get one SymptomMapping
     * const symptomMapping = await prisma.symptomMapping.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SymptomMappingFindUniqueArgs>(args: SelectSubset<T, SymptomMappingFindUniqueArgs<ExtArgs>>): Prisma__SymptomMappingClient<$Result.GetResult<Prisma.$SymptomMappingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SymptomMapping that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SymptomMappingFindUniqueOrThrowArgs} args - Arguments to find a SymptomMapping
     * @example
     * // Get one SymptomMapping
     * const symptomMapping = await prisma.symptomMapping.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SymptomMappingFindUniqueOrThrowArgs>(args: SelectSubset<T, SymptomMappingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SymptomMappingClient<$Result.GetResult<Prisma.$SymptomMappingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SymptomMapping that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomMappingFindFirstArgs} args - Arguments to find a SymptomMapping
     * @example
     * // Get one SymptomMapping
     * const symptomMapping = await prisma.symptomMapping.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SymptomMappingFindFirstArgs>(args?: SelectSubset<T, SymptomMappingFindFirstArgs<ExtArgs>>): Prisma__SymptomMappingClient<$Result.GetResult<Prisma.$SymptomMappingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SymptomMapping that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomMappingFindFirstOrThrowArgs} args - Arguments to find a SymptomMapping
     * @example
     * // Get one SymptomMapping
     * const symptomMapping = await prisma.symptomMapping.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SymptomMappingFindFirstOrThrowArgs>(args?: SelectSubset<T, SymptomMappingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SymptomMappingClient<$Result.GetResult<Prisma.$SymptomMappingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SymptomMappings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomMappingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SymptomMappings
     * const symptomMappings = await prisma.symptomMapping.findMany()
     * 
     * // Get first 10 SymptomMappings
     * const symptomMappings = await prisma.symptomMapping.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const symptomMappingWithIdOnly = await prisma.symptomMapping.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SymptomMappingFindManyArgs>(args?: SelectSubset<T, SymptomMappingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SymptomMappingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SymptomMapping.
     * @param {SymptomMappingCreateArgs} args - Arguments to create a SymptomMapping.
     * @example
     * // Create one SymptomMapping
     * const SymptomMapping = await prisma.symptomMapping.create({
     *   data: {
     *     // ... data to create a SymptomMapping
     *   }
     * })
     * 
     */
    create<T extends SymptomMappingCreateArgs>(args: SelectSubset<T, SymptomMappingCreateArgs<ExtArgs>>): Prisma__SymptomMappingClient<$Result.GetResult<Prisma.$SymptomMappingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SymptomMappings.
     * @param {SymptomMappingCreateManyArgs} args - Arguments to create many SymptomMappings.
     * @example
     * // Create many SymptomMappings
     * const symptomMapping = await prisma.symptomMapping.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SymptomMappingCreateManyArgs>(args?: SelectSubset<T, SymptomMappingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SymptomMapping.
     * @param {SymptomMappingDeleteArgs} args - Arguments to delete one SymptomMapping.
     * @example
     * // Delete one SymptomMapping
     * const SymptomMapping = await prisma.symptomMapping.delete({
     *   where: {
     *     // ... filter to delete one SymptomMapping
     *   }
     * })
     * 
     */
    delete<T extends SymptomMappingDeleteArgs>(args: SelectSubset<T, SymptomMappingDeleteArgs<ExtArgs>>): Prisma__SymptomMappingClient<$Result.GetResult<Prisma.$SymptomMappingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SymptomMapping.
     * @param {SymptomMappingUpdateArgs} args - Arguments to update one SymptomMapping.
     * @example
     * // Update one SymptomMapping
     * const symptomMapping = await prisma.symptomMapping.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SymptomMappingUpdateArgs>(args: SelectSubset<T, SymptomMappingUpdateArgs<ExtArgs>>): Prisma__SymptomMappingClient<$Result.GetResult<Prisma.$SymptomMappingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SymptomMappings.
     * @param {SymptomMappingDeleteManyArgs} args - Arguments to filter SymptomMappings to delete.
     * @example
     * // Delete a few SymptomMappings
     * const { count } = await prisma.symptomMapping.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SymptomMappingDeleteManyArgs>(args?: SelectSubset<T, SymptomMappingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SymptomMappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomMappingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SymptomMappings
     * const symptomMapping = await prisma.symptomMapping.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SymptomMappingUpdateManyArgs>(args: SelectSubset<T, SymptomMappingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SymptomMapping.
     * @param {SymptomMappingUpsertArgs} args - Arguments to update or create a SymptomMapping.
     * @example
     * // Update or create a SymptomMapping
     * const symptomMapping = await prisma.symptomMapping.upsert({
     *   create: {
     *     // ... data to create a SymptomMapping
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SymptomMapping we want to update
     *   }
     * })
     */
    upsert<T extends SymptomMappingUpsertArgs>(args: SelectSubset<T, SymptomMappingUpsertArgs<ExtArgs>>): Prisma__SymptomMappingClient<$Result.GetResult<Prisma.$SymptomMappingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SymptomMappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomMappingCountArgs} args - Arguments to filter SymptomMappings to count.
     * @example
     * // Count the number of SymptomMappings
     * const count = await prisma.symptomMapping.count({
     *   where: {
     *     // ... the filter for the SymptomMappings we want to count
     *   }
     * })
    **/
    count<T extends SymptomMappingCountArgs>(
      args?: Subset<T, SymptomMappingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SymptomMappingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SymptomMapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomMappingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SymptomMappingAggregateArgs>(args: Subset<T, SymptomMappingAggregateArgs>): Prisma.PrismaPromise<GetSymptomMappingAggregateType<T>>

    /**
     * Group by SymptomMapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomMappingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SymptomMappingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SymptomMappingGroupByArgs['orderBy'] }
        : { orderBy?: SymptomMappingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SymptomMappingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSymptomMappingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SymptomMapping model
   */
  readonly fields: SymptomMappingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SymptomMapping.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SymptomMappingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SymptomMapping model
   */
  interface SymptomMappingFieldRefs {
    readonly id: FieldRef<"SymptomMapping", 'Int'>
    readonly keyword: FieldRef<"SymptomMapping", 'String'>
    readonly synonyms: FieldRef<"SymptomMapping", 'String'>
    readonly deptName: FieldRef<"SymptomMapping", 'String'>
    readonly bodyPart: FieldRef<"SymptomMapping", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SymptomMapping findUnique
   */
  export type SymptomMappingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomMapping
     */
    select?: SymptomMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomMapping
     */
    omit?: SymptomMappingOmit<ExtArgs> | null
    /**
     * Filter, which SymptomMapping to fetch.
     */
    where: SymptomMappingWhereUniqueInput
  }

  /**
   * SymptomMapping findUniqueOrThrow
   */
  export type SymptomMappingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomMapping
     */
    select?: SymptomMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomMapping
     */
    omit?: SymptomMappingOmit<ExtArgs> | null
    /**
     * Filter, which SymptomMapping to fetch.
     */
    where: SymptomMappingWhereUniqueInput
  }

  /**
   * SymptomMapping findFirst
   */
  export type SymptomMappingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomMapping
     */
    select?: SymptomMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomMapping
     */
    omit?: SymptomMappingOmit<ExtArgs> | null
    /**
     * Filter, which SymptomMapping to fetch.
     */
    where?: SymptomMappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SymptomMappings to fetch.
     */
    orderBy?: SymptomMappingOrderByWithRelationInput | SymptomMappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SymptomMappings.
     */
    cursor?: SymptomMappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SymptomMappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SymptomMappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SymptomMappings.
     */
    distinct?: SymptomMappingScalarFieldEnum | SymptomMappingScalarFieldEnum[]
  }

  /**
   * SymptomMapping findFirstOrThrow
   */
  export type SymptomMappingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomMapping
     */
    select?: SymptomMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomMapping
     */
    omit?: SymptomMappingOmit<ExtArgs> | null
    /**
     * Filter, which SymptomMapping to fetch.
     */
    where?: SymptomMappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SymptomMappings to fetch.
     */
    orderBy?: SymptomMappingOrderByWithRelationInput | SymptomMappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SymptomMappings.
     */
    cursor?: SymptomMappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SymptomMappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SymptomMappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SymptomMappings.
     */
    distinct?: SymptomMappingScalarFieldEnum | SymptomMappingScalarFieldEnum[]
  }

  /**
   * SymptomMapping findMany
   */
  export type SymptomMappingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomMapping
     */
    select?: SymptomMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomMapping
     */
    omit?: SymptomMappingOmit<ExtArgs> | null
    /**
     * Filter, which SymptomMappings to fetch.
     */
    where?: SymptomMappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SymptomMappings to fetch.
     */
    orderBy?: SymptomMappingOrderByWithRelationInput | SymptomMappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SymptomMappings.
     */
    cursor?: SymptomMappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SymptomMappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SymptomMappings.
     */
    skip?: number
    distinct?: SymptomMappingScalarFieldEnum | SymptomMappingScalarFieldEnum[]
  }

  /**
   * SymptomMapping create
   */
  export type SymptomMappingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomMapping
     */
    select?: SymptomMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomMapping
     */
    omit?: SymptomMappingOmit<ExtArgs> | null
    /**
     * The data needed to create a SymptomMapping.
     */
    data: XOR<SymptomMappingCreateInput, SymptomMappingUncheckedCreateInput>
  }

  /**
   * SymptomMapping createMany
   */
  export type SymptomMappingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SymptomMappings.
     */
    data: SymptomMappingCreateManyInput | SymptomMappingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SymptomMapping update
   */
  export type SymptomMappingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomMapping
     */
    select?: SymptomMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomMapping
     */
    omit?: SymptomMappingOmit<ExtArgs> | null
    /**
     * The data needed to update a SymptomMapping.
     */
    data: XOR<SymptomMappingUpdateInput, SymptomMappingUncheckedUpdateInput>
    /**
     * Choose, which SymptomMapping to update.
     */
    where: SymptomMappingWhereUniqueInput
  }

  /**
   * SymptomMapping updateMany
   */
  export type SymptomMappingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SymptomMappings.
     */
    data: XOR<SymptomMappingUpdateManyMutationInput, SymptomMappingUncheckedUpdateManyInput>
    /**
     * Filter which SymptomMappings to update
     */
    where?: SymptomMappingWhereInput
    /**
     * Limit how many SymptomMappings to update.
     */
    limit?: number
  }

  /**
   * SymptomMapping upsert
   */
  export type SymptomMappingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomMapping
     */
    select?: SymptomMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomMapping
     */
    omit?: SymptomMappingOmit<ExtArgs> | null
    /**
     * The filter to search for the SymptomMapping to update in case it exists.
     */
    where: SymptomMappingWhereUniqueInput
    /**
     * In case the SymptomMapping found by the `where` argument doesn't exist, create a new SymptomMapping with this data.
     */
    create: XOR<SymptomMappingCreateInput, SymptomMappingUncheckedCreateInput>
    /**
     * In case the SymptomMapping was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SymptomMappingUpdateInput, SymptomMappingUncheckedUpdateInput>
  }

  /**
   * SymptomMapping delete
   */
  export type SymptomMappingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomMapping
     */
    select?: SymptomMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomMapping
     */
    omit?: SymptomMappingOmit<ExtArgs> | null
    /**
     * Filter which SymptomMapping to delete.
     */
    where: SymptomMappingWhereUniqueInput
  }

  /**
   * SymptomMapping deleteMany
   */
  export type SymptomMappingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SymptomMappings to delete
     */
    where?: SymptomMappingWhereInput
    /**
     * Limit how many SymptomMappings to delete.
     */
    limit?: number
  }

  /**
   * SymptomMapping without action
   */
  export type SymptomMappingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomMapping
     */
    select?: SymptomMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomMapping
     */
    omit?: SymptomMappingOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    nickname: 'nickname',
    nationality: 'nationality',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PassportScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    passportNumber: 'passportNumber',
    gender: 'gender',
    issueDate: 'issueDate',
    expiryDate: 'expiryDate',
    userPhotoUrl: 'userPhotoUrl',
    createdAt: 'createdAt'
  };

  export type PassportScalarFieldEnum = (typeof PassportScalarFieldEnum)[keyof typeof PassportScalarFieldEnum]


  export const ARCScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    arcNumber: 'arcNumber',
    residenceStatus: 'residenceStatus',
    issueDate: 'issueDate',
    userPhotoUrl: 'userPhotoUrl',
    createdAt: 'createdAt'
  };

  export type ARCScalarFieldEnum = (typeof ARCScalarFieldEnum)[keyof typeof ARCScalarFieldEnum]


  export const UserDocumentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    docType: 'docType',
    fileUrl: 'fileUrl',
    createdAt: 'createdAt'
  };

  export type UserDocumentScalarFieldEnum = (typeof UserDocumentScalarFieldEnum)[keyof typeof UserDocumentScalarFieldEnum]


  export const UserCardScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    cardType: 'cardType',
    cardNumber: 'cardNumber',
    balance: 'balance',
    isDefault: 'isDefault',
    createdAt: 'createdAt'
  };

  export type UserCardScalarFieldEnum = (typeof UserCardScalarFieldEnum)[keyof typeof UserCardScalarFieldEnum]


  export const CouponScalarFieldEnum: {
    id: 'id',
    tag: 'tag',
    discount: 'discount',
    category: 'category',
    couponCode: 'couponCode',
    brandName: 'brandName',
    brandPic: 'brandPic',
    latitude: 'latitude',
    longitude: 'longitude'
  };

  export type CouponScalarFieldEnum = (typeof CouponScalarFieldEnum)[keyof typeof CouponScalarFieldEnum]


  export const SavedPlaceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    placeName: 'placeName',
    category: 'category',
    latitude: 'latitude',
    longitude: 'longitude',
    address: 'address',
    openHours: 'openHours',
    phone: 'phone'
  };

  export type SavedPlaceScalarFieldEnum = (typeof SavedPlaceScalarFieldEnum)[keyof typeof SavedPlaceScalarFieldEnum]


  export const HospitalScalarFieldEnum: {
    id: 'id',
    nameKo: 'nameKo',
    imageUrl: 'imageUrl',
    address: 'address',
    latitude: 'latitude',
    longitude: 'longitude',
    phone: 'phone',
    openHours: 'openHours'
  };

  export type HospitalScalarFieldEnum = (typeof HospitalScalarFieldEnum)[keyof typeof HospitalScalarFieldEnum]


  export const HospitalDeptScalarFieldEnum: {
    id: 'id',
    hospitalId: 'hospitalId',
    deptName: 'deptName'
  };

  export type HospitalDeptScalarFieldEnum = (typeof HospitalDeptScalarFieldEnum)[keyof typeof HospitalDeptScalarFieldEnum]


  export const HospitalLangScalarFieldEnum: {
    id: 'id',
    hospitalId: 'hospitalId',
    langName: 'langName'
  };

  export type HospitalLangScalarFieldEnum = (typeof HospitalLangScalarFieldEnum)[keyof typeof HospitalLangScalarFieldEnum]


  export const HospitalReviewScalarFieldEnum: {
    id: 'id',
    hospitalId: 'hospitalId',
    aiSummary: 'aiSummary'
  };

  export type HospitalReviewScalarFieldEnum = (typeof HospitalReviewScalarFieldEnum)[keyof typeof HospitalReviewScalarFieldEnum]


  export const EmbassyScalarFieldEnum: {
    id: 'id',
    nationality: 'nationality',
    placeName: 'placeName',
    address: 'address',
    openHours: 'openHours',
    phone: 'phone'
  };

  export type EmbassyScalarFieldEnum = (typeof EmbassyScalarFieldEnum)[keyof typeof EmbassyScalarFieldEnum]


  export const SymptomMappingScalarFieldEnum: {
    id: 'id',
    keyword: 'keyword',
    synonyms: 'synonyms',
    deptName: 'deptName',
    bodyPart: 'bodyPart'
  };

  export type SymptomMappingScalarFieldEnum = (typeof SymptomMappingScalarFieldEnum)[keyof typeof SymptomMappingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const UserOrderByRelevanceFieldEnum: {
    nickname: 'nickname',
    nationality: 'nationality'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const PassportOrderByRelevanceFieldEnum: {
    passportNumber: 'passportNumber',
    userPhotoUrl: 'userPhotoUrl'
  };

  export type PassportOrderByRelevanceFieldEnum = (typeof PassportOrderByRelevanceFieldEnum)[keyof typeof PassportOrderByRelevanceFieldEnum]


  export const ARCOrderByRelevanceFieldEnum: {
    arcNumber: 'arcNumber',
    residenceStatus: 'residenceStatus',
    userPhotoUrl: 'userPhotoUrl'
  };

  export type ARCOrderByRelevanceFieldEnum = (typeof ARCOrderByRelevanceFieldEnum)[keyof typeof ARCOrderByRelevanceFieldEnum]


  export const UserDocumentOrderByRelevanceFieldEnum: {
    fileUrl: 'fileUrl'
  };

  export type UserDocumentOrderByRelevanceFieldEnum = (typeof UserDocumentOrderByRelevanceFieldEnum)[keyof typeof UserDocumentOrderByRelevanceFieldEnum]


  export const UserCardOrderByRelevanceFieldEnum: {
    cardNumber: 'cardNumber'
  };

  export type UserCardOrderByRelevanceFieldEnum = (typeof UserCardOrderByRelevanceFieldEnum)[keyof typeof UserCardOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const CouponOrderByRelevanceFieldEnum: {
    tag: 'tag',
    couponCode: 'couponCode',
    brandName: 'brandName',
    brandPic: 'brandPic'
  };

  export type CouponOrderByRelevanceFieldEnum = (typeof CouponOrderByRelevanceFieldEnum)[keyof typeof CouponOrderByRelevanceFieldEnum]


  export const SavedPlaceOrderByRelevanceFieldEnum: {
    placeName: 'placeName',
    latitude: 'latitude',
    longitude: 'longitude',
    address: 'address',
    openHours: 'openHours',
    phone: 'phone'
  };

  export type SavedPlaceOrderByRelevanceFieldEnum = (typeof SavedPlaceOrderByRelevanceFieldEnum)[keyof typeof SavedPlaceOrderByRelevanceFieldEnum]


  export const HospitalOrderByRelevanceFieldEnum: {
    nameKo: 'nameKo',
    imageUrl: 'imageUrl',
    address: 'address',
    phone: 'phone',
    openHours: 'openHours'
  };

  export type HospitalOrderByRelevanceFieldEnum = (typeof HospitalOrderByRelevanceFieldEnum)[keyof typeof HospitalOrderByRelevanceFieldEnum]


  export const HospitalDeptOrderByRelevanceFieldEnum: {
    deptName: 'deptName'
  };

  export type HospitalDeptOrderByRelevanceFieldEnum = (typeof HospitalDeptOrderByRelevanceFieldEnum)[keyof typeof HospitalDeptOrderByRelevanceFieldEnum]


  export const HospitalLangOrderByRelevanceFieldEnum: {
    langName: 'langName'
  };

  export type HospitalLangOrderByRelevanceFieldEnum = (typeof HospitalLangOrderByRelevanceFieldEnum)[keyof typeof HospitalLangOrderByRelevanceFieldEnum]


  export const HospitalReviewOrderByRelevanceFieldEnum: {
    aiSummary: 'aiSummary'
  };

  export type HospitalReviewOrderByRelevanceFieldEnum = (typeof HospitalReviewOrderByRelevanceFieldEnum)[keyof typeof HospitalReviewOrderByRelevanceFieldEnum]


  export const EmbassyOrderByRelevanceFieldEnum: {
    nationality: 'nationality',
    placeName: 'placeName',
    address: 'address',
    openHours: 'openHours',
    phone: 'phone'
  };

  export type EmbassyOrderByRelevanceFieldEnum = (typeof EmbassyOrderByRelevanceFieldEnum)[keyof typeof EmbassyOrderByRelevanceFieldEnum]


  export const SymptomMappingOrderByRelevanceFieldEnum: {
    keyword: 'keyword',
    synonyms: 'synonyms',
    deptName: 'deptName',
    bodyPart: 'bodyPart'
  };

  export type SymptomMappingOrderByRelevanceFieldEnum = (typeof SymptomMappingOrderByRelevanceFieldEnum)[keyof typeof SymptomMappingOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'DocType'
   */
  export type EnumDocTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocType'>
    


  /**
   * Reference to a field of type 'CardType'
   */
  export type EnumCardTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CardType'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'CouponCategory'
   */
  export type EnumCouponCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CouponCategory'>
    


  /**
   * Reference to a field of type 'PlaceCategory'
   */
  export type EnumPlaceCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlaceCategory'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    nickname?: StringFilter<"User"> | string
    nationality?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Passport?: XOR<PassportNullableScalarRelationFilter, PassportWhereInput> | null
    ARC?: XOR<ARCNullableScalarRelationFilter, ARCWhereInput> | null
    UserDocument?: UserDocumentListRelationFilter
    UserCard?: UserCardListRelationFilter
    SavedPlace?: SavedPlaceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nickname?: SortOrder
    nationality?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Passport?: PassportOrderByWithRelationInput
    ARC?: ARCOrderByWithRelationInput
    UserDocument?: UserDocumentOrderByRelationAggregateInput
    UserCard?: UserCardOrderByRelationAggregateInput
    SavedPlace?: SavedPlaceOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nickname?: StringFilter<"User"> | string
    nationality?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Passport?: XOR<PassportNullableScalarRelationFilter, PassportWhereInput> | null
    ARC?: XOR<ARCNullableScalarRelationFilter, ARCWhereInput> | null
    UserDocument?: UserDocumentListRelationFilter
    UserCard?: UserCardListRelationFilter
    SavedPlace?: SavedPlaceListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nickname?: SortOrder
    nationality?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    nickname?: StringWithAggregatesFilter<"User"> | string
    nationality?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PassportWhereInput = {
    AND?: PassportWhereInput | PassportWhereInput[]
    OR?: PassportWhereInput[]
    NOT?: PassportWhereInput | PassportWhereInput[]
    id?: IntFilter<"Passport"> | number
    userId?: IntFilter<"Passport"> | number
    passportNumber?: StringFilter<"Passport"> | string
    gender?: EnumGenderFilter<"Passport"> | $Enums.Gender
    issueDate?: DateTimeFilter<"Passport"> | Date | string
    expiryDate?: DateTimeFilter<"Passport"> | Date | string
    userPhotoUrl?: StringFilter<"Passport"> | string
    createdAt?: DateTimeFilter<"Passport"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PassportOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    passportNumber?: SortOrder
    gender?: SortOrder
    issueDate?: SortOrder
    expiryDate?: SortOrder
    userPhotoUrl?: SortOrder
    createdAt?: SortOrder
    User?: UserOrderByWithRelationInput
    _relevance?: PassportOrderByRelevanceInput
  }

  export type PassportWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    passportNumber?: string
    AND?: PassportWhereInput | PassportWhereInput[]
    OR?: PassportWhereInput[]
    NOT?: PassportWhereInput | PassportWhereInput[]
    gender?: EnumGenderFilter<"Passport"> | $Enums.Gender
    issueDate?: DateTimeFilter<"Passport"> | Date | string
    expiryDate?: DateTimeFilter<"Passport"> | Date | string
    userPhotoUrl?: StringFilter<"Passport"> | string
    createdAt?: DateTimeFilter<"Passport"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId" | "passportNumber">

  export type PassportOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    passportNumber?: SortOrder
    gender?: SortOrder
    issueDate?: SortOrder
    expiryDate?: SortOrder
    userPhotoUrl?: SortOrder
    createdAt?: SortOrder
    _count?: PassportCountOrderByAggregateInput
    _avg?: PassportAvgOrderByAggregateInput
    _max?: PassportMaxOrderByAggregateInput
    _min?: PassportMinOrderByAggregateInput
    _sum?: PassportSumOrderByAggregateInput
  }

  export type PassportScalarWhereWithAggregatesInput = {
    AND?: PassportScalarWhereWithAggregatesInput | PassportScalarWhereWithAggregatesInput[]
    OR?: PassportScalarWhereWithAggregatesInput[]
    NOT?: PassportScalarWhereWithAggregatesInput | PassportScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Passport"> | number
    userId?: IntWithAggregatesFilter<"Passport"> | number
    passportNumber?: StringWithAggregatesFilter<"Passport"> | string
    gender?: EnumGenderWithAggregatesFilter<"Passport"> | $Enums.Gender
    issueDate?: DateTimeWithAggregatesFilter<"Passport"> | Date | string
    expiryDate?: DateTimeWithAggregatesFilter<"Passport"> | Date | string
    userPhotoUrl?: StringWithAggregatesFilter<"Passport"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Passport"> | Date | string
  }

  export type ARCWhereInput = {
    AND?: ARCWhereInput | ARCWhereInput[]
    OR?: ARCWhereInput[]
    NOT?: ARCWhereInput | ARCWhereInput[]
    id?: IntFilter<"ARC"> | number
    userId?: IntFilter<"ARC"> | number
    arcNumber?: StringFilter<"ARC"> | string
    residenceStatus?: StringFilter<"ARC"> | string
    issueDate?: DateTimeFilter<"ARC"> | Date | string
    userPhotoUrl?: StringFilter<"ARC"> | string
    createdAt?: DateTimeFilter<"ARC"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ARCOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    arcNumber?: SortOrder
    residenceStatus?: SortOrder
    issueDate?: SortOrder
    userPhotoUrl?: SortOrder
    createdAt?: SortOrder
    User?: UserOrderByWithRelationInput
    _relevance?: ARCOrderByRelevanceInput
  }

  export type ARCWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    arcNumber?: string
    AND?: ARCWhereInput | ARCWhereInput[]
    OR?: ARCWhereInput[]
    NOT?: ARCWhereInput | ARCWhereInput[]
    residenceStatus?: StringFilter<"ARC"> | string
    issueDate?: DateTimeFilter<"ARC"> | Date | string
    userPhotoUrl?: StringFilter<"ARC"> | string
    createdAt?: DateTimeFilter<"ARC"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId" | "arcNumber">

  export type ARCOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    arcNumber?: SortOrder
    residenceStatus?: SortOrder
    issueDate?: SortOrder
    userPhotoUrl?: SortOrder
    createdAt?: SortOrder
    _count?: ARCCountOrderByAggregateInput
    _avg?: ARCAvgOrderByAggregateInput
    _max?: ARCMaxOrderByAggregateInput
    _min?: ARCMinOrderByAggregateInput
    _sum?: ARCSumOrderByAggregateInput
  }

  export type ARCScalarWhereWithAggregatesInput = {
    AND?: ARCScalarWhereWithAggregatesInput | ARCScalarWhereWithAggregatesInput[]
    OR?: ARCScalarWhereWithAggregatesInput[]
    NOT?: ARCScalarWhereWithAggregatesInput | ARCScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ARC"> | number
    userId?: IntWithAggregatesFilter<"ARC"> | number
    arcNumber?: StringWithAggregatesFilter<"ARC"> | string
    residenceStatus?: StringWithAggregatesFilter<"ARC"> | string
    issueDate?: DateTimeWithAggregatesFilter<"ARC"> | Date | string
    userPhotoUrl?: StringWithAggregatesFilter<"ARC"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ARC"> | Date | string
  }

  export type UserDocumentWhereInput = {
    AND?: UserDocumentWhereInput | UserDocumentWhereInput[]
    OR?: UserDocumentWhereInput[]
    NOT?: UserDocumentWhereInput | UserDocumentWhereInput[]
    id?: IntFilter<"UserDocument"> | number
    userId?: IntFilter<"UserDocument"> | number
    docType?: EnumDocTypeFilter<"UserDocument"> | $Enums.DocType
    fileUrl?: StringFilter<"UserDocument"> | string
    createdAt?: DateTimeFilter<"UserDocument"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserDocumentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    docType?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    User?: UserOrderByWithRelationInput
    _relevance?: UserDocumentOrderByRelevanceInput
  }

  export type UserDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserDocumentWhereInput | UserDocumentWhereInput[]
    OR?: UserDocumentWhereInput[]
    NOT?: UserDocumentWhereInput | UserDocumentWhereInput[]
    userId?: IntFilter<"UserDocument"> | number
    docType?: EnumDocTypeFilter<"UserDocument"> | $Enums.DocType
    fileUrl?: StringFilter<"UserDocument"> | string
    createdAt?: DateTimeFilter<"UserDocument"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    docType?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    _count?: UserDocumentCountOrderByAggregateInput
    _avg?: UserDocumentAvgOrderByAggregateInput
    _max?: UserDocumentMaxOrderByAggregateInput
    _min?: UserDocumentMinOrderByAggregateInput
    _sum?: UserDocumentSumOrderByAggregateInput
  }

  export type UserDocumentScalarWhereWithAggregatesInput = {
    AND?: UserDocumentScalarWhereWithAggregatesInput | UserDocumentScalarWhereWithAggregatesInput[]
    OR?: UserDocumentScalarWhereWithAggregatesInput[]
    NOT?: UserDocumentScalarWhereWithAggregatesInput | UserDocumentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserDocument"> | number
    userId?: IntWithAggregatesFilter<"UserDocument"> | number
    docType?: EnumDocTypeWithAggregatesFilter<"UserDocument"> | $Enums.DocType
    fileUrl?: StringWithAggregatesFilter<"UserDocument"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserDocument"> | Date | string
  }

  export type UserCardWhereInput = {
    AND?: UserCardWhereInput | UserCardWhereInput[]
    OR?: UserCardWhereInput[]
    NOT?: UserCardWhereInput | UserCardWhereInput[]
    id?: IntFilter<"UserCard"> | number
    userId?: IntFilter<"UserCard"> | number
    cardType?: EnumCardTypeFilter<"UserCard"> | $Enums.CardType
    cardNumber?: StringFilter<"UserCard"> | string
    balance?: DecimalFilter<"UserCard"> | Decimal | DecimalJsLike | number | string
    isDefault?: BoolFilter<"UserCard"> | boolean
    createdAt?: DateTimeFilter<"UserCard"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserCardOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    cardType?: SortOrder
    cardNumber?: SortOrder
    balance?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    User?: UserOrderByWithRelationInput
    _relevance?: UserCardOrderByRelevanceInput
  }

  export type UserCardWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    cardNumber?: string
    AND?: UserCardWhereInput | UserCardWhereInput[]
    OR?: UserCardWhereInput[]
    NOT?: UserCardWhereInput | UserCardWhereInput[]
    userId?: IntFilter<"UserCard"> | number
    cardType?: EnumCardTypeFilter<"UserCard"> | $Enums.CardType
    balance?: DecimalFilter<"UserCard"> | Decimal | DecimalJsLike | number | string
    isDefault?: BoolFilter<"UserCard"> | boolean
    createdAt?: DateTimeFilter<"UserCard"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "cardNumber">

  export type UserCardOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    cardType?: SortOrder
    cardNumber?: SortOrder
    balance?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    _count?: UserCardCountOrderByAggregateInput
    _avg?: UserCardAvgOrderByAggregateInput
    _max?: UserCardMaxOrderByAggregateInput
    _min?: UserCardMinOrderByAggregateInput
    _sum?: UserCardSumOrderByAggregateInput
  }

  export type UserCardScalarWhereWithAggregatesInput = {
    AND?: UserCardScalarWhereWithAggregatesInput | UserCardScalarWhereWithAggregatesInput[]
    OR?: UserCardScalarWhereWithAggregatesInput[]
    NOT?: UserCardScalarWhereWithAggregatesInput | UserCardScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserCard"> | number
    userId?: IntWithAggregatesFilter<"UserCard"> | number
    cardType?: EnumCardTypeWithAggregatesFilter<"UserCard"> | $Enums.CardType
    cardNumber?: StringWithAggregatesFilter<"UserCard"> | string
    balance?: DecimalWithAggregatesFilter<"UserCard"> | Decimal | DecimalJsLike | number | string
    isDefault?: BoolWithAggregatesFilter<"UserCard"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UserCard"> | Date | string
  }

  export type CouponWhereInput = {
    AND?: CouponWhereInput | CouponWhereInput[]
    OR?: CouponWhereInput[]
    NOT?: CouponWhereInput | CouponWhereInput[]
    id?: IntFilter<"Coupon"> | number
    tag?: StringNullableFilter<"Coupon"> | string | null
    discount?: IntFilter<"Coupon"> | number
    category?: EnumCouponCategoryFilter<"Coupon"> | $Enums.CouponCategory
    couponCode?: StringFilter<"Coupon"> | string
    brandName?: StringFilter<"Coupon"> | string
    brandPic?: StringFilter<"Coupon"> | string
    latitude?: DecimalFilter<"Coupon"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFilter<"Coupon"> | Decimal | DecimalJsLike | number | string
  }

  export type CouponOrderByWithRelationInput = {
    id?: SortOrder
    tag?: SortOrderInput | SortOrder
    discount?: SortOrder
    category?: SortOrder
    couponCode?: SortOrder
    brandName?: SortOrder
    brandPic?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    _relevance?: CouponOrderByRelevanceInput
  }

  export type CouponWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    couponCode?: string
    AND?: CouponWhereInput | CouponWhereInput[]
    OR?: CouponWhereInput[]
    NOT?: CouponWhereInput | CouponWhereInput[]
    tag?: StringNullableFilter<"Coupon"> | string | null
    discount?: IntFilter<"Coupon"> | number
    category?: EnumCouponCategoryFilter<"Coupon"> | $Enums.CouponCategory
    brandName?: StringFilter<"Coupon"> | string
    brandPic?: StringFilter<"Coupon"> | string
    latitude?: DecimalFilter<"Coupon"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFilter<"Coupon"> | Decimal | DecimalJsLike | number | string
  }, "id" | "couponCode">

  export type CouponOrderByWithAggregationInput = {
    id?: SortOrder
    tag?: SortOrderInput | SortOrder
    discount?: SortOrder
    category?: SortOrder
    couponCode?: SortOrder
    brandName?: SortOrder
    brandPic?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    _count?: CouponCountOrderByAggregateInput
    _avg?: CouponAvgOrderByAggregateInput
    _max?: CouponMaxOrderByAggregateInput
    _min?: CouponMinOrderByAggregateInput
    _sum?: CouponSumOrderByAggregateInput
  }

  export type CouponScalarWhereWithAggregatesInput = {
    AND?: CouponScalarWhereWithAggregatesInput | CouponScalarWhereWithAggregatesInput[]
    OR?: CouponScalarWhereWithAggregatesInput[]
    NOT?: CouponScalarWhereWithAggregatesInput | CouponScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Coupon"> | number
    tag?: StringNullableWithAggregatesFilter<"Coupon"> | string | null
    discount?: IntWithAggregatesFilter<"Coupon"> | number
    category?: EnumCouponCategoryWithAggregatesFilter<"Coupon"> | $Enums.CouponCategory
    couponCode?: StringWithAggregatesFilter<"Coupon"> | string
    brandName?: StringWithAggregatesFilter<"Coupon"> | string
    brandPic?: StringWithAggregatesFilter<"Coupon"> | string
    latitude?: DecimalWithAggregatesFilter<"Coupon"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalWithAggregatesFilter<"Coupon"> | Decimal | DecimalJsLike | number | string
  }

  export type SavedPlaceWhereInput = {
    AND?: SavedPlaceWhereInput | SavedPlaceWhereInput[]
    OR?: SavedPlaceWhereInput[]
    NOT?: SavedPlaceWhereInput | SavedPlaceWhereInput[]
    id?: IntFilter<"SavedPlace"> | number
    userId?: IntFilter<"SavedPlace"> | number
    placeName?: StringFilter<"SavedPlace"> | string
    category?: EnumPlaceCategoryFilter<"SavedPlace"> | $Enums.PlaceCategory
    latitude?: StringFilter<"SavedPlace"> | string
    longitude?: StringFilter<"SavedPlace"> | string
    address?: StringFilter<"SavedPlace"> | string
    openHours?: StringFilter<"SavedPlace"> | string
    phone?: StringFilter<"SavedPlace"> | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SavedPlaceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    placeName?: SortOrder
    category?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    openHours?: SortOrder
    phone?: SortOrder
    User?: UserOrderByWithRelationInput
    _relevance?: SavedPlaceOrderByRelevanceInput
  }

  export type SavedPlaceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SavedPlaceWhereInput | SavedPlaceWhereInput[]
    OR?: SavedPlaceWhereInput[]
    NOT?: SavedPlaceWhereInput | SavedPlaceWhereInput[]
    userId?: IntFilter<"SavedPlace"> | number
    placeName?: StringFilter<"SavedPlace"> | string
    category?: EnumPlaceCategoryFilter<"SavedPlace"> | $Enums.PlaceCategory
    latitude?: StringFilter<"SavedPlace"> | string
    longitude?: StringFilter<"SavedPlace"> | string
    address?: StringFilter<"SavedPlace"> | string
    openHours?: StringFilter<"SavedPlace"> | string
    phone?: StringFilter<"SavedPlace"> | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SavedPlaceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    placeName?: SortOrder
    category?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    openHours?: SortOrder
    phone?: SortOrder
    _count?: SavedPlaceCountOrderByAggregateInput
    _avg?: SavedPlaceAvgOrderByAggregateInput
    _max?: SavedPlaceMaxOrderByAggregateInput
    _min?: SavedPlaceMinOrderByAggregateInput
    _sum?: SavedPlaceSumOrderByAggregateInput
  }

  export type SavedPlaceScalarWhereWithAggregatesInput = {
    AND?: SavedPlaceScalarWhereWithAggregatesInput | SavedPlaceScalarWhereWithAggregatesInput[]
    OR?: SavedPlaceScalarWhereWithAggregatesInput[]
    NOT?: SavedPlaceScalarWhereWithAggregatesInput | SavedPlaceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SavedPlace"> | number
    userId?: IntWithAggregatesFilter<"SavedPlace"> | number
    placeName?: StringWithAggregatesFilter<"SavedPlace"> | string
    category?: EnumPlaceCategoryWithAggregatesFilter<"SavedPlace"> | $Enums.PlaceCategory
    latitude?: StringWithAggregatesFilter<"SavedPlace"> | string
    longitude?: StringWithAggregatesFilter<"SavedPlace"> | string
    address?: StringWithAggregatesFilter<"SavedPlace"> | string
    openHours?: StringWithAggregatesFilter<"SavedPlace"> | string
    phone?: StringWithAggregatesFilter<"SavedPlace"> | string
  }

  export type HospitalWhereInput = {
    AND?: HospitalWhereInput | HospitalWhereInput[]
    OR?: HospitalWhereInput[]
    NOT?: HospitalWhereInput | HospitalWhereInput[]
    id?: IntFilter<"Hospital"> | number
    nameKo?: StringFilter<"Hospital"> | string
    imageUrl?: StringNullableFilter<"Hospital"> | string | null
    address?: StringFilter<"Hospital"> | string
    latitude?: DecimalFilter<"Hospital"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFilter<"Hospital"> | Decimal | DecimalJsLike | number | string
    phone?: StringNullableFilter<"Hospital"> | string | null
    openHours?: StringFilter<"Hospital"> | string
    HospitalDept?: HospitalDeptListRelationFilter
    HospitalLang?: HospitalLangListRelationFilter
    HospitalReview?: XOR<HospitalReviewNullableScalarRelationFilter, HospitalReviewWhereInput> | null
  }

  export type HospitalOrderByWithRelationInput = {
    id?: SortOrder
    nameKo?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrderInput | SortOrder
    openHours?: SortOrder
    HospitalDept?: HospitalDeptOrderByRelationAggregateInput
    HospitalLang?: HospitalLangOrderByRelationAggregateInput
    HospitalReview?: HospitalReviewOrderByWithRelationInput
    _relevance?: HospitalOrderByRelevanceInput
  }

  export type HospitalWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: HospitalWhereInput | HospitalWhereInput[]
    OR?: HospitalWhereInput[]
    NOT?: HospitalWhereInput | HospitalWhereInput[]
    nameKo?: StringFilter<"Hospital"> | string
    imageUrl?: StringNullableFilter<"Hospital"> | string | null
    address?: StringFilter<"Hospital"> | string
    latitude?: DecimalFilter<"Hospital"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFilter<"Hospital"> | Decimal | DecimalJsLike | number | string
    phone?: StringNullableFilter<"Hospital"> | string | null
    openHours?: StringFilter<"Hospital"> | string
    HospitalDept?: HospitalDeptListRelationFilter
    HospitalLang?: HospitalLangListRelationFilter
    HospitalReview?: XOR<HospitalReviewNullableScalarRelationFilter, HospitalReviewWhereInput> | null
  }, "id">

  export type HospitalOrderByWithAggregationInput = {
    id?: SortOrder
    nameKo?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrderInput | SortOrder
    openHours?: SortOrder
    _count?: HospitalCountOrderByAggregateInput
    _avg?: HospitalAvgOrderByAggregateInput
    _max?: HospitalMaxOrderByAggregateInput
    _min?: HospitalMinOrderByAggregateInput
    _sum?: HospitalSumOrderByAggregateInput
  }

  export type HospitalScalarWhereWithAggregatesInput = {
    AND?: HospitalScalarWhereWithAggregatesInput | HospitalScalarWhereWithAggregatesInput[]
    OR?: HospitalScalarWhereWithAggregatesInput[]
    NOT?: HospitalScalarWhereWithAggregatesInput | HospitalScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Hospital"> | number
    nameKo?: StringWithAggregatesFilter<"Hospital"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    address?: StringWithAggregatesFilter<"Hospital"> | string
    latitude?: DecimalWithAggregatesFilter<"Hospital"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalWithAggregatesFilter<"Hospital"> | Decimal | DecimalJsLike | number | string
    phone?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    openHours?: StringWithAggregatesFilter<"Hospital"> | string
  }

  export type HospitalDeptWhereInput = {
    AND?: HospitalDeptWhereInput | HospitalDeptWhereInput[]
    OR?: HospitalDeptWhereInput[]
    NOT?: HospitalDeptWhereInput | HospitalDeptWhereInput[]
    id?: IntFilter<"HospitalDept"> | number
    hospitalId?: IntFilter<"HospitalDept"> | number
    deptName?: StringFilter<"HospitalDept"> | string
    Hospital?: XOR<HospitalScalarRelationFilter, HospitalWhereInput>
  }

  export type HospitalDeptOrderByWithRelationInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    deptName?: SortOrder
    Hospital?: HospitalOrderByWithRelationInput
    _relevance?: HospitalDeptOrderByRelevanceInput
  }

  export type HospitalDeptWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: HospitalDeptWhereInput | HospitalDeptWhereInput[]
    OR?: HospitalDeptWhereInput[]
    NOT?: HospitalDeptWhereInput | HospitalDeptWhereInput[]
    hospitalId?: IntFilter<"HospitalDept"> | number
    deptName?: StringFilter<"HospitalDept"> | string
    Hospital?: XOR<HospitalScalarRelationFilter, HospitalWhereInput>
  }, "id">

  export type HospitalDeptOrderByWithAggregationInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    deptName?: SortOrder
    _count?: HospitalDeptCountOrderByAggregateInput
    _avg?: HospitalDeptAvgOrderByAggregateInput
    _max?: HospitalDeptMaxOrderByAggregateInput
    _min?: HospitalDeptMinOrderByAggregateInput
    _sum?: HospitalDeptSumOrderByAggregateInput
  }

  export type HospitalDeptScalarWhereWithAggregatesInput = {
    AND?: HospitalDeptScalarWhereWithAggregatesInput | HospitalDeptScalarWhereWithAggregatesInput[]
    OR?: HospitalDeptScalarWhereWithAggregatesInput[]
    NOT?: HospitalDeptScalarWhereWithAggregatesInput | HospitalDeptScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HospitalDept"> | number
    hospitalId?: IntWithAggregatesFilter<"HospitalDept"> | number
    deptName?: StringWithAggregatesFilter<"HospitalDept"> | string
  }

  export type HospitalLangWhereInput = {
    AND?: HospitalLangWhereInput | HospitalLangWhereInput[]
    OR?: HospitalLangWhereInput[]
    NOT?: HospitalLangWhereInput | HospitalLangWhereInput[]
    id?: IntFilter<"HospitalLang"> | number
    hospitalId?: IntFilter<"HospitalLang"> | number
    langName?: StringFilter<"HospitalLang"> | string
    Hospital?: XOR<HospitalScalarRelationFilter, HospitalWhereInput>
  }

  export type HospitalLangOrderByWithRelationInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    langName?: SortOrder
    Hospital?: HospitalOrderByWithRelationInput
    _relevance?: HospitalLangOrderByRelevanceInput
  }

  export type HospitalLangWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: HospitalLangWhereInput | HospitalLangWhereInput[]
    OR?: HospitalLangWhereInput[]
    NOT?: HospitalLangWhereInput | HospitalLangWhereInput[]
    hospitalId?: IntFilter<"HospitalLang"> | number
    langName?: StringFilter<"HospitalLang"> | string
    Hospital?: XOR<HospitalScalarRelationFilter, HospitalWhereInput>
  }, "id">

  export type HospitalLangOrderByWithAggregationInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    langName?: SortOrder
    _count?: HospitalLangCountOrderByAggregateInput
    _avg?: HospitalLangAvgOrderByAggregateInput
    _max?: HospitalLangMaxOrderByAggregateInput
    _min?: HospitalLangMinOrderByAggregateInput
    _sum?: HospitalLangSumOrderByAggregateInput
  }

  export type HospitalLangScalarWhereWithAggregatesInput = {
    AND?: HospitalLangScalarWhereWithAggregatesInput | HospitalLangScalarWhereWithAggregatesInput[]
    OR?: HospitalLangScalarWhereWithAggregatesInput[]
    NOT?: HospitalLangScalarWhereWithAggregatesInput | HospitalLangScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HospitalLang"> | number
    hospitalId?: IntWithAggregatesFilter<"HospitalLang"> | number
    langName?: StringWithAggregatesFilter<"HospitalLang"> | string
  }

  export type HospitalReviewWhereInput = {
    AND?: HospitalReviewWhereInput | HospitalReviewWhereInput[]
    OR?: HospitalReviewWhereInput[]
    NOT?: HospitalReviewWhereInput | HospitalReviewWhereInput[]
    id?: IntFilter<"HospitalReview"> | number
    hospitalId?: IntFilter<"HospitalReview"> | number
    aiSummary?: StringFilter<"HospitalReview"> | string
    Hospital?: XOR<HospitalScalarRelationFilter, HospitalWhereInput>
  }

  export type HospitalReviewOrderByWithRelationInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    aiSummary?: SortOrder
    Hospital?: HospitalOrderByWithRelationInput
    _relevance?: HospitalReviewOrderByRelevanceInput
  }

  export type HospitalReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    hospitalId?: number
    AND?: HospitalReviewWhereInput | HospitalReviewWhereInput[]
    OR?: HospitalReviewWhereInput[]
    NOT?: HospitalReviewWhereInput | HospitalReviewWhereInput[]
    aiSummary?: StringFilter<"HospitalReview"> | string
    Hospital?: XOR<HospitalScalarRelationFilter, HospitalWhereInput>
  }, "id" | "hospitalId">

  export type HospitalReviewOrderByWithAggregationInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    aiSummary?: SortOrder
    _count?: HospitalReviewCountOrderByAggregateInput
    _avg?: HospitalReviewAvgOrderByAggregateInput
    _max?: HospitalReviewMaxOrderByAggregateInput
    _min?: HospitalReviewMinOrderByAggregateInput
    _sum?: HospitalReviewSumOrderByAggregateInput
  }

  export type HospitalReviewScalarWhereWithAggregatesInput = {
    AND?: HospitalReviewScalarWhereWithAggregatesInput | HospitalReviewScalarWhereWithAggregatesInput[]
    OR?: HospitalReviewScalarWhereWithAggregatesInput[]
    NOT?: HospitalReviewScalarWhereWithAggregatesInput | HospitalReviewScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HospitalReview"> | number
    hospitalId?: IntWithAggregatesFilter<"HospitalReview"> | number
    aiSummary?: StringWithAggregatesFilter<"HospitalReview"> | string
  }

  export type EmbassyWhereInput = {
    AND?: EmbassyWhereInput | EmbassyWhereInput[]
    OR?: EmbassyWhereInput[]
    NOT?: EmbassyWhereInput | EmbassyWhereInput[]
    id?: IntFilter<"Embassy"> | number
    nationality?: StringFilter<"Embassy"> | string
    placeName?: StringFilter<"Embassy"> | string
    address?: StringFilter<"Embassy"> | string
    openHours?: StringFilter<"Embassy"> | string
    phone?: StringFilter<"Embassy"> | string
  }

  export type EmbassyOrderByWithRelationInput = {
    id?: SortOrder
    nationality?: SortOrder
    placeName?: SortOrder
    address?: SortOrder
    openHours?: SortOrder
    phone?: SortOrder
    _relevance?: EmbassyOrderByRelevanceInput
  }

  export type EmbassyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EmbassyWhereInput | EmbassyWhereInput[]
    OR?: EmbassyWhereInput[]
    NOT?: EmbassyWhereInput | EmbassyWhereInput[]
    nationality?: StringFilter<"Embassy"> | string
    placeName?: StringFilter<"Embassy"> | string
    address?: StringFilter<"Embassy"> | string
    openHours?: StringFilter<"Embassy"> | string
    phone?: StringFilter<"Embassy"> | string
  }, "id">

  export type EmbassyOrderByWithAggregationInput = {
    id?: SortOrder
    nationality?: SortOrder
    placeName?: SortOrder
    address?: SortOrder
    openHours?: SortOrder
    phone?: SortOrder
    _count?: EmbassyCountOrderByAggregateInput
    _avg?: EmbassyAvgOrderByAggregateInput
    _max?: EmbassyMaxOrderByAggregateInput
    _min?: EmbassyMinOrderByAggregateInput
    _sum?: EmbassySumOrderByAggregateInput
  }

  export type EmbassyScalarWhereWithAggregatesInput = {
    AND?: EmbassyScalarWhereWithAggregatesInput | EmbassyScalarWhereWithAggregatesInput[]
    OR?: EmbassyScalarWhereWithAggregatesInput[]
    NOT?: EmbassyScalarWhereWithAggregatesInput | EmbassyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Embassy"> | number
    nationality?: StringWithAggregatesFilter<"Embassy"> | string
    placeName?: StringWithAggregatesFilter<"Embassy"> | string
    address?: StringWithAggregatesFilter<"Embassy"> | string
    openHours?: StringWithAggregatesFilter<"Embassy"> | string
    phone?: StringWithAggregatesFilter<"Embassy"> | string
  }

  export type SymptomMappingWhereInput = {
    AND?: SymptomMappingWhereInput | SymptomMappingWhereInput[]
    OR?: SymptomMappingWhereInput[]
    NOT?: SymptomMappingWhereInput | SymptomMappingWhereInput[]
    id?: IntFilter<"SymptomMapping"> | number
    keyword?: StringFilter<"SymptomMapping"> | string
    synonyms?: StringFilter<"SymptomMapping"> | string
    deptName?: StringFilter<"SymptomMapping"> | string
    bodyPart?: StringFilter<"SymptomMapping"> | string
  }

  export type SymptomMappingOrderByWithRelationInput = {
    id?: SortOrder
    keyword?: SortOrder
    synonyms?: SortOrder
    deptName?: SortOrder
    bodyPart?: SortOrder
    _relevance?: SymptomMappingOrderByRelevanceInput
  }

  export type SymptomMappingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SymptomMappingWhereInput | SymptomMappingWhereInput[]
    OR?: SymptomMappingWhereInput[]
    NOT?: SymptomMappingWhereInput | SymptomMappingWhereInput[]
    keyword?: StringFilter<"SymptomMapping"> | string
    synonyms?: StringFilter<"SymptomMapping"> | string
    deptName?: StringFilter<"SymptomMapping"> | string
    bodyPart?: StringFilter<"SymptomMapping"> | string
  }, "id">

  export type SymptomMappingOrderByWithAggregationInput = {
    id?: SortOrder
    keyword?: SortOrder
    synonyms?: SortOrder
    deptName?: SortOrder
    bodyPart?: SortOrder
    _count?: SymptomMappingCountOrderByAggregateInput
    _avg?: SymptomMappingAvgOrderByAggregateInput
    _max?: SymptomMappingMaxOrderByAggregateInput
    _min?: SymptomMappingMinOrderByAggregateInput
    _sum?: SymptomMappingSumOrderByAggregateInput
  }

  export type SymptomMappingScalarWhereWithAggregatesInput = {
    AND?: SymptomMappingScalarWhereWithAggregatesInput | SymptomMappingScalarWhereWithAggregatesInput[]
    OR?: SymptomMappingScalarWhereWithAggregatesInput[]
    NOT?: SymptomMappingScalarWhereWithAggregatesInput | SymptomMappingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SymptomMapping"> | number
    keyword?: StringWithAggregatesFilter<"SymptomMapping"> | string
    synonyms?: StringWithAggregatesFilter<"SymptomMapping"> | string
    deptName?: StringWithAggregatesFilter<"SymptomMapping"> | string
    bodyPart?: StringWithAggregatesFilter<"SymptomMapping"> | string
  }

  export type UserCreateInput = {
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Passport?: PassportCreateNestedOneWithoutUserInput
    ARC?: ARCCreateNestedOneWithoutUserInput
    UserDocument?: UserDocumentCreateNestedManyWithoutUserInput
    UserCard?: UserCardCreateNestedManyWithoutUserInput
    SavedPlace?: SavedPlaceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Passport?: PassportUncheckedCreateNestedOneWithoutUserInput
    ARC?: ARCUncheckedCreateNestedOneWithoutUserInput
    UserDocument?: UserDocumentUncheckedCreateNestedManyWithoutUserInput
    UserCard?: UserCardUncheckedCreateNestedManyWithoutUserInput
    SavedPlace?: SavedPlaceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Passport?: PassportUpdateOneWithoutUserNestedInput
    ARC?: ARCUpdateOneWithoutUserNestedInput
    UserDocument?: UserDocumentUpdateManyWithoutUserNestedInput
    UserCard?: UserCardUpdateManyWithoutUserNestedInput
    SavedPlace?: SavedPlaceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Passport?: PassportUncheckedUpdateOneWithoutUserNestedInput
    ARC?: ARCUncheckedUpdateOneWithoutUserNestedInput
    UserDocument?: UserDocumentUncheckedUpdateManyWithoutUserNestedInput
    UserCard?: UserCardUncheckedUpdateManyWithoutUserNestedInput
    SavedPlace?: SavedPlaceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PassportCreateInput = {
    passportNumber: string
    gender: $Enums.Gender
    issueDate: Date | string
    expiryDate: Date | string
    userPhotoUrl: string
    createdAt?: Date | string
    User: UserCreateNestedOneWithoutPassportInput
  }

  export type PassportUncheckedCreateInput = {
    id?: number
    userId: number
    passportNumber: string
    gender: $Enums.Gender
    issueDate: Date | string
    expiryDate: Date | string
    userPhotoUrl: string
    createdAt?: Date | string
  }

  export type PassportUpdateInput = {
    passportNumber?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    userPhotoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutPassportNestedInput
  }

  export type PassportUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    passportNumber?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    userPhotoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PassportCreateManyInput = {
    id?: number
    userId: number
    passportNumber: string
    gender: $Enums.Gender
    issueDate: Date | string
    expiryDate: Date | string
    userPhotoUrl: string
    createdAt?: Date | string
  }

  export type PassportUpdateManyMutationInput = {
    passportNumber?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    userPhotoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PassportUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    passportNumber?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    userPhotoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ARCCreateInput = {
    arcNumber: string
    residenceStatus: string
    issueDate: Date | string
    userPhotoUrl: string
    createdAt?: Date | string
    User: UserCreateNestedOneWithoutARCInput
  }

  export type ARCUncheckedCreateInput = {
    id?: number
    userId: number
    arcNumber: string
    residenceStatus: string
    issueDate: Date | string
    userPhotoUrl: string
    createdAt?: Date | string
  }

  export type ARCUpdateInput = {
    arcNumber?: StringFieldUpdateOperationsInput | string
    residenceStatus?: StringFieldUpdateOperationsInput | string
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    userPhotoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutARCNestedInput
  }

  export type ARCUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    arcNumber?: StringFieldUpdateOperationsInput | string
    residenceStatus?: StringFieldUpdateOperationsInput | string
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    userPhotoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ARCCreateManyInput = {
    id?: number
    userId: number
    arcNumber: string
    residenceStatus: string
    issueDate: Date | string
    userPhotoUrl: string
    createdAt?: Date | string
  }

  export type ARCUpdateManyMutationInput = {
    arcNumber?: StringFieldUpdateOperationsInput | string
    residenceStatus?: StringFieldUpdateOperationsInput | string
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    userPhotoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ARCUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    arcNumber?: StringFieldUpdateOperationsInput | string
    residenceStatus?: StringFieldUpdateOperationsInput | string
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    userPhotoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDocumentCreateInput = {
    docType: $Enums.DocType
    fileUrl: string
    createdAt?: Date | string
    User: UserCreateNestedOneWithoutUserDocumentInput
  }

  export type UserDocumentUncheckedCreateInput = {
    id?: number
    userId: number
    docType: $Enums.DocType
    fileUrl: string
    createdAt?: Date | string
  }

  export type UserDocumentUpdateInput = {
    docType?: EnumDocTypeFieldUpdateOperationsInput | $Enums.DocType
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutUserDocumentNestedInput
  }

  export type UserDocumentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    docType?: EnumDocTypeFieldUpdateOperationsInput | $Enums.DocType
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDocumentCreateManyInput = {
    id?: number
    userId: number
    docType: $Enums.DocType
    fileUrl: string
    createdAt?: Date | string
  }

  export type UserDocumentUpdateManyMutationInput = {
    docType?: EnumDocTypeFieldUpdateOperationsInput | $Enums.DocType
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDocumentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    docType?: EnumDocTypeFieldUpdateOperationsInput | $Enums.DocType
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardCreateInput = {
    cardType: $Enums.CardType
    cardNumber: string
    balance?: Decimal | DecimalJsLike | number | string
    isDefault?: boolean
    createdAt?: Date | string
    User: UserCreateNestedOneWithoutUserCardInput
  }

  export type UserCardUncheckedCreateInput = {
    id?: number
    userId: number
    cardType: $Enums.CardType
    cardNumber: string
    balance?: Decimal | DecimalJsLike | number | string
    isDefault?: boolean
    createdAt?: Date | string
  }

  export type UserCardUpdateInput = {
    cardType?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    cardNumber?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutUserCardNestedInput
  }

  export type UserCardUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    cardType?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    cardNumber?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardCreateManyInput = {
    id?: number
    userId: number
    cardType: $Enums.CardType
    cardNumber: string
    balance?: Decimal | DecimalJsLike | number | string
    isDefault?: boolean
    createdAt?: Date | string
  }

  export type UserCardUpdateManyMutationInput = {
    cardType?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    cardNumber?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    cardType?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    cardNumber?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CouponCreateInput = {
    tag?: string | null
    discount: number
    category: $Enums.CouponCategory
    couponCode: string
    brandName: string
    brandPic: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
  }

  export type CouponUncheckedCreateInput = {
    id?: number
    tag?: string | null
    discount: number
    category: $Enums.CouponCategory
    couponCode: string
    brandName: string
    brandPic: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
  }

  export type CouponUpdateInput = {
    tag?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: IntFieldUpdateOperationsInput | number
    category?: EnumCouponCategoryFieldUpdateOperationsInput | $Enums.CouponCategory
    couponCode?: StringFieldUpdateOperationsInput | string
    brandName?: StringFieldUpdateOperationsInput | string
    brandPic?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type CouponUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: IntFieldUpdateOperationsInput | number
    category?: EnumCouponCategoryFieldUpdateOperationsInput | $Enums.CouponCategory
    couponCode?: StringFieldUpdateOperationsInput | string
    brandName?: StringFieldUpdateOperationsInput | string
    brandPic?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type CouponCreateManyInput = {
    id?: number
    tag?: string | null
    discount: number
    category: $Enums.CouponCategory
    couponCode: string
    brandName: string
    brandPic: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
  }

  export type CouponUpdateManyMutationInput = {
    tag?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: IntFieldUpdateOperationsInput | number
    category?: EnumCouponCategoryFieldUpdateOperationsInput | $Enums.CouponCategory
    couponCode?: StringFieldUpdateOperationsInput | string
    brandName?: StringFieldUpdateOperationsInput | string
    brandPic?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type CouponUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tag?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: IntFieldUpdateOperationsInput | number
    category?: EnumCouponCategoryFieldUpdateOperationsInput | $Enums.CouponCategory
    couponCode?: StringFieldUpdateOperationsInput | string
    brandName?: StringFieldUpdateOperationsInput | string
    brandPic?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type SavedPlaceCreateInput = {
    placeName: string
    category: $Enums.PlaceCategory
    latitude: string
    longitude: string
    address: string
    openHours: string
    phone: string
    User: UserCreateNestedOneWithoutSavedPlaceInput
  }

  export type SavedPlaceUncheckedCreateInput = {
    id?: number
    userId: number
    placeName: string
    category: $Enums.PlaceCategory
    latitude: string
    longitude: string
    address: string
    openHours: string
    phone: string
  }

  export type SavedPlaceUpdateInput = {
    placeName?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaceCategoryFieldUpdateOperationsInput | $Enums.PlaceCategory
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    openHours?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateOneRequiredWithoutSavedPlaceNestedInput
  }

  export type SavedPlaceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    placeName?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaceCategoryFieldUpdateOperationsInput | $Enums.PlaceCategory
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    openHours?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type SavedPlaceCreateManyInput = {
    id?: number
    userId: number
    placeName: string
    category: $Enums.PlaceCategory
    latitude: string
    longitude: string
    address: string
    openHours: string
    phone: string
  }

  export type SavedPlaceUpdateManyMutationInput = {
    placeName?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaceCategoryFieldUpdateOperationsInput | $Enums.PlaceCategory
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    openHours?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type SavedPlaceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    placeName?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaceCategoryFieldUpdateOperationsInput | $Enums.PlaceCategory
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    openHours?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalCreateInput = {
    nameKo: string
    imageUrl?: string | null
    address: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    phone?: string | null
    openHours: string
    HospitalDept?: HospitalDeptCreateNestedManyWithoutHospitalInput
    HospitalLang?: HospitalLangCreateNestedManyWithoutHospitalInput
    HospitalReview?: HospitalReviewCreateNestedOneWithoutHospitalInput
  }

  export type HospitalUncheckedCreateInput = {
    id?: number
    nameKo: string
    imageUrl?: string | null
    address: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    phone?: string | null
    openHours: string
    HospitalDept?: HospitalDeptUncheckedCreateNestedManyWithoutHospitalInput
    HospitalLang?: HospitalLangUncheckedCreateNestedManyWithoutHospitalInput
    HospitalReview?: HospitalReviewUncheckedCreateNestedOneWithoutHospitalInput
  }

  export type HospitalUpdateInput = {
    nameKo?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    openHours?: StringFieldUpdateOperationsInput | string
    HospitalDept?: HospitalDeptUpdateManyWithoutHospitalNestedInput
    HospitalLang?: HospitalLangUpdateManyWithoutHospitalNestedInput
    HospitalReview?: HospitalReviewUpdateOneWithoutHospitalNestedInput
  }

  export type HospitalUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nameKo?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    openHours?: StringFieldUpdateOperationsInput | string
    HospitalDept?: HospitalDeptUncheckedUpdateManyWithoutHospitalNestedInput
    HospitalLang?: HospitalLangUncheckedUpdateManyWithoutHospitalNestedInput
    HospitalReview?: HospitalReviewUncheckedUpdateOneWithoutHospitalNestedInput
  }

  export type HospitalCreateManyInput = {
    id?: number
    nameKo: string
    imageUrl?: string | null
    address: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    phone?: string | null
    openHours: string
  }

  export type HospitalUpdateManyMutationInput = {
    nameKo?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    openHours?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nameKo?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    openHours?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalDeptCreateInput = {
    deptName: string
    Hospital: HospitalCreateNestedOneWithoutHospitalDeptInput
  }

  export type HospitalDeptUncheckedCreateInput = {
    id?: number
    hospitalId: number
    deptName: string
  }

  export type HospitalDeptUpdateInput = {
    deptName?: StringFieldUpdateOperationsInput | string
    Hospital?: HospitalUpdateOneRequiredWithoutHospitalDeptNestedInput
  }

  export type HospitalDeptUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hospitalId?: IntFieldUpdateOperationsInput | number
    deptName?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalDeptCreateManyInput = {
    id?: number
    hospitalId: number
    deptName: string
  }

  export type HospitalDeptUpdateManyMutationInput = {
    deptName?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalDeptUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hospitalId?: IntFieldUpdateOperationsInput | number
    deptName?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalLangCreateInput = {
    langName: string
    Hospital: HospitalCreateNestedOneWithoutHospitalLangInput
  }

  export type HospitalLangUncheckedCreateInput = {
    id?: number
    hospitalId: number
    langName: string
  }

  export type HospitalLangUpdateInput = {
    langName?: StringFieldUpdateOperationsInput | string
    Hospital?: HospitalUpdateOneRequiredWithoutHospitalLangNestedInput
  }

  export type HospitalLangUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hospitalId?: IntFieldUpdateOperationsInput | number
    langName?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalLangCreateManyInput = {
    id?: number
    hospitalId: number
    langName: string
  }

  export type HospitalLangUpdateManyMutationInput = {
    langName?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalLangUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hospitalId?: IntFieldUpdateOperationsInput | number
    langName?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalReviewCreateInput = {
    aiSummary: string
    Hospital: HospitalCreateNestedOneWithoutHospitalReviewInput
  }

  export type HospitalReviewUncheckedCreateInput = {
    id?: number
    hospitalId: number
    aiSummary: string
  }

  export type HospitalReviewUpdateInput = {
    aiSummary?: StringFieldUpdateOperationsInput | string
    Hospital?: HospitalUpdateOneRequiredWithoutHospitalReviewNestedInput
  }

  export type HospitalReviewUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hospitalId?: IntFieldUpdateOperationsInput | number
    aiSummary?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalReviewCreateManyInput = {
    id?: number
    hospitalId: number
    aiSummary: string
  }

  export type HospitalReviewUpdateManyMutationInput = {
    aiSummary?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalReviewUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hospitalId?: IntFieldUpdateOperationsInput | number
    aiSummary?: StringFieldUpdateOperationsInput | string
  }

  export type EmbassyCreateInput = {
    nationality: string
    placeName: string
    address: string
    openHours: string
    phone: string
  }

  export type EmbassyUncheckedCreateInput = {
    id?: number
    nationality: string
    placeName: string
    address: string
    openHours: string
    phone: string
  }

  export type EmbassyUpdateInput = {
    nationality?: StringFieldUpdateOperationsInput | string
    placeName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    openHours?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type EmbassyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nationality?: StringFieldUpdateOperationsInput | string
    placeName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    openHours?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type EmbassyCreateManyInput = {
    id?: number
    nationality: string
    placeName: string
    address: string
    openHours: string
    phone: string
  }

  export type EmbassyUpdateManyMutationInput = {
    nationality?: StringFieldUpdateOperationsInput | string
    placeName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    openHours?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type EmbassyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nationality?: StringFieldUpdateOperationsInput | string
    placeName?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    openHours?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type SymptomMappingCreateInput = {
    keyword: string
    synonyms: string
    deptName: string
    bodyPart: string
  }

  export type SymptomMappingUncheckedCreateInput = {
    id?: number
    keyword: string
    synonyms: string
    deptName: string
    bodyPart: string
  }

  export type SymptomMappingUpdateInput = {
    keyword?: StringFieldUpdateOperationsInput | string
    synonyms?: StringFieldUpdateOperationsInput | string
    deptName?: StringFieldUpdateOperationsInput | string
    bodyPart?: StringFieldUpdateOperationsInput | string
  }

  export type SymptomMappingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    keyword?: StringFieldUpdateOperationsInput | string
    synonyms?: StringFieldUpdateOperationsInput | string
    deptName?: StringFieldUpdateOperationsInput | string
    bodyPart?: StringFieldUpdateOperationsInput | string
  }

  export type SymptomMappingCreateManyInput = {
    id?: number
    keyword: string
    synonyms: string
    deptName: string
    bodyPart: string
  }

  export type SymptomMappingUpdateManyMutationInput = {
    keyword?: StringFieldUpdateOperationsInput | string
    synonyms?: StringFieldUpdateOperationsInput | string
    deptName?: StringFieldUpdateOperationsInput | string
    bodyPart?: StringFieldUpdateOperationsInput | string
  }

  export type SymptomMappingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    keyword?: StringFieldUpdateOperationsInput | string
    synonyms?: StringFieldUpdateOperationsInput | string
    deptName?: StringFieldUpdateOperationsInput | string
    bodyPart?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PassportNullableScalarRelationFilter = {
    is?: PassportWhereInput | null
    isNot?: PassportWhereInput | null
  }

  export type ARCNullableScalarRelationFilter = {
    is?: ARCWhereInput | null
    isNot?: ARCWhereInput | null
  }

  export type UserDocumentListRelationFilter = {
    every?: UserDocumentWhereInput
    some?: UserDocumentWhereInput
    none?: UserDocumentWhereInput
  }

  export type UserCardListRelationFilter = {
    every?: UserCardWhereInput
    some?: UserCardWhereInput
    none?: UserCardWhereInput
  }

  export type SavedPlaceListRelationFilter = {
    every?: SavedPlaceWhereInput
    some?: SavedPlaceWhereInput
    none?: SavedPlaceWhereInput
  }

  export type UserDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SavedPlaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nickname?: SortOrder
    nationality?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nickname?: SortOrder
    nationality?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nickname?: SortOrder
    nationality?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[]
    notIn?: $Enums.Gender[]
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PassportOrderByRelevanceInput = {
    fields: PassportOrderByRelevanceFieldEnum | PassportOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PassportCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    passportNumber?: SortOrder
    gender?: SortOrder
    issueDate?: SortOrder
    expiryDate?: SortOrder
    userPhotoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type PassportAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type PassportMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    passportNumber?: SortOrder
    gender?: SortOrder
    issueDate?: SortOrder
    expiryDate?: SortOrder
    userPhotoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type PassportMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    passportNumber?: SortOrder
    gender?: SortOrder
    issueDate?: SortOrder
    expiryDate?: SortOrder
    userPhotoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type PassportSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[]
    notIn?: $Enums.Gender[]
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type ARCOrderByRelevanceInput = {
    fields: ARCOrderByRelevanceFieldEnum | ARCOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ARCCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    arcNumber?: SortOrder
    residenceStatus?: SortOrder
    issueDate?: SortOrder
    userPhotoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ARCAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ARCMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    arcNumber?: SortOrder
    residenceStatus?: SortOrder
    issueDate?: SortOrder
    userPhotoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ARCMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    arcNumber?: SortOrder
    residenceStatus?: SortOrder
    issueDate?: SortOrder
    userPhotoUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ARCSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumDocTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocType | EnumDocTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocType[]
    notIn?: $Enums.DocType[]
    not?: NestedEnumDocTypeFilter<$PrismaModel> | $Enums.DocType
  }

  export type UserDocumentOrderByRelevanceInput = {
    fields: UserDocumentOrderByRelevanceFieldEnum | UserDocumentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    docType?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type UserDocumentAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    docType?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type UserDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    docType?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type UserDocumentSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumDocTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocType | EnumDocTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocType[]
    notIn?: $Enums.DocType[]
    not?: NestedEnumDocTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocTypeFilter<$PrismaModel>
    _max?: NestedEnumDocTypeFilter<$PrismaModel>
  }

  export type EnumCardTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CardType | EnumCardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CardType[]
    notIn?: $Enums.CardType[]
    not?: NestedEnumCardTypeFilter<$PrismaModel> | $Enums.CardType
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserCardOrderByRelevanceInput = {
    fields: UserCardOrderByRelevanceFieldEnum | UserCardOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCardCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cardType?: SortOrder
    cardNumber?: SortOrder
    balance?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCardAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
  }

  export type UserCardMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cardType?: SortOrder
    cardNumber?: SortOrder
    balance?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCardMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cardType?: SortOrder
    cardNumber?: SortOrder
    balance?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCardSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
  }

  export type EnumCardTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CardType | EnumCardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CardType[]
    notIn?: $Enums.CardType[]
    not?: NestedEnumCardTypeWithAggregatesFilter<$PrismaModel> | $Enums.CardType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCardTypeFilter<$PrismaModel>
    _max?: NestedEnumCardTypeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumCouponCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.CouponCategory | EnumCouponCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CouponCategory[]
    notIn?: $Enums.CouponCategory[]
    not?: NestedEnumCouponCategoryFilter<$PrismaModel> | $Enums.CouponCategory
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CouponOrderByRelevanceInput = {
    fields: CouponOrderByRelevanceFieldEnum | CouponOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CouponCountOrderByAggregateInput = {
    id?: SortOrder
    tag?: SortOrder
    discount?: SortOrder
    category?: SortOrder
    couponCode?: SortOrder
    brandName?: SortOrder
    brandPic?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type CouponAvgOrderByAggregateInput = {
    id?: SortOrder
    discount?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type CouponMaxOrderByAggregateInput = {
    id?: SortOrder
    tag?: SortOrder
    discount?: SortOrder
    category?: SortOrder
    couponCode?: SortOrder
    brandName?: SortOrder
    brandPic?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type CouponMinOrderByAggregateInput = {
    id?: SortOrder
    tag?: SortOrder
    discount?: SortOrder
    category?: SortOrder
    couponCode?: SortOrder
    brandName?: SortOrder
    brandPic?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type CouponSumOrderByAggregateInput = {
    id?: SortOrder
    discount?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumCouponCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CouponCategory | EnumCouponCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CouponCategory[]
    notIn?: $Enums.CouponCategory[]
    not?: NestedEnumCouponCategoryWithAggregatesFilter<$PrismaModel> | $Enums.CouponCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCouponCategoryFilter<$PrismaModel>
    _max?: NestedEnumCouponCategoryFilter<$PrismaModel>
  }

  export type EnumPlaceCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PlaceCategory | EnumPlaceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PlaceCategory[]
    notIn?: $Enums.PlaceCategory[]
    not?: NestedEnumPlaceCategoryFilter<$PrismaModel> | $Enums.PlaceCategory
  }

  export type SavedPlaceOrderByRelevanceInput = {
    fields: SavedPlaceOrderByRelevanceFieldEnum | SavedPlaceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SavedPlaceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    placeName?: SortOrder
    category?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    openHours?: SortOrder
    phone?: SortOrder
  }

  export type SavedPlaceAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type SavedPlaceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    placeName?: SortOrder
    category?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    openHours?: SortOrder
    phone?: SortOrder
  }

  export type SavedPlaceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    placeName?: SortOrder
    category?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    address?: SortOrder
    openHours?: SortOrder
    phone?: SortOrder
  }

  export type SavedPlaceSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumPlaceCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlaceCategory | EnumPlaceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PlaceCategory[]
    notIn?: $Enums.PlaceCategory[]
    not?: NestedEnumPlaceCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PlaceCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlaceCategoryFilter<$PrismaModel>
    _max?: NestedEnumPlaceCategoryFilter<$PrismaModel>
  }

  export type HospitalDeptListRelationFilter = {
    every?: HospitalDeptWhereInput
    some?: HospitalDeptWhereInput
    none?: HospitalDeptWhereInput
  }

  export type HospitalLangListRelationFilter = {
    every?: HospitalLangWhereInput
    some?: HospitalLangWhereInput
    none?: HospitalLangWhereInput
  }

  export type HospitalReviewNullableScalarRelationFilter = {
    is?: HospitalReviewWhereInput | null
    isNot?: HospitalReviewWhereInput | null
  }

  export type HospitalDeptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HospitalLangOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HospitalOrderByRelevanceInput = {
    fields: HospitalOrderByRelevanceFieldEnum | HospitalOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type HospitalCountOrderByAggregateInput = {
    id?: SortOrder
    nameKo?: SortOrder
    imageUrl?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrder
    openHours?: SortOrder
  }

  export type HospitalAvgOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type HospitalMaxOrderByAggregateInput = {
    id?: SortOrder
    nameKo?: SortOrder
    imageUrl?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrder
    openHours?: SortOrder
  }

  export type HospitalMinOrderByAggregateInput = {
    id?: SortOrder
    nameKo?: SortOrder
    imageUrl?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrder
    openHours?: SortOrder
  }

  export type HospitalSumOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type HospitalScalarRelationFilter = {
    is?: HospitalWhereInput
    isNot?: HospitalWhereInput
  }

  export type HospitalDeptOrderByRelevanceInput = {
    fields: HospitalDeptOrderByRelevanceFieldEnum | HospitalDeptOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type HospitalDeptCountOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    deptName?: SortOrder
  }

  export type HospitalDeptAvgOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
  }

  export type HospitalDeptMaxOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    deptName?: SortOrder
  }

  export type HospitalDeptMinOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    deptName?: SortOrder
  }

  export type HospitalDeptSumOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
  }

  export type HospitalLangOrderByRelevanceInput = {
    fields: HospitalLangOrderByRelevanceFieldEnum | HospitalLangOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type HospitalLangCountOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    langName?: SortOrder
  }

  export type HospitalLangAvgOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
  }

  export type HospitalLangMaxOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    langName?: SortOrder
  }

  export type HospitalLangMinOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    langName?: SortOrder
  }

  export type HospitalLangSumOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
  }

  export type HospitalReviewOrderByRelevanceInput = {
    fields: HospitalReviewOrderByRelevanceFieldEnum | HospitalReviewOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type HospitalReviewCountOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    aiSummary?: SortOrder
  }

  export type HospitalReviewAvgOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
  }

  export type HospitalReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    aiSummary?: SortOrder
  }

  export type HospitalReviewMinOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
    aiSummary?: SortOrder
  }

  export type HospitalReviewSumOrderByAggregateInput = {
    id?: SortOrder
    hospitalId?: SortOrder
  }

  export type EmbassyOrderByRelevanceInput = {
    fields: EmbassyOrderByRelevanceFieldEnum | EmbassyOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EmbassyCountOrderByAggregateInput = {
    id?: SortOrder
    nationality?: SortOrder
    placeName?: SortOrder
    address?: SortOrder
    openHours?: SortOrder
    phone?: SortOrder
  }

  export type EmbassyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EmbassyMaxOrderByAggregateInput = {
    id?: SortOrder
    nationality?: SortOrder
    placeName?: SortOrder
    address?: SortOrder
    openHours?: SortOrder
    phone?: SortOrder
  }

  export type EmbassyMinOrderByAggregateInput = {
    id?: SortOrder
    nationality?: SortOrder
    placeName?: SortOrder
    address?: SortOrder
    openHours?: SortOrder
    phone?: SortOrder
  }

  export type EmbassySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SymptomMappingOrderByRelevanceInput = {
    fields: SymptomMappingOrderByRelevanceFieldEnum | SymptomMappingOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SymptomMappingCountOrderByAggregateInput = {
    id?: SortOrder
    keyword?: SortOrder
    synonyms?: SortOrder
    deptName?: SortOrder
    bodyPart?: SortOrder
  }

  export type SymptomMappingAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SymptomMappingMaxOrderByAggregateInput = {
    id?: SortOrder
    keyword?: SortOrder
    synonyms?: SortOrder
    deptName?: SortOrder
    bodyPart?: SortOrder
  }

  export type SymptomMappingMinOrderByAggregateInput = {
    id?: SortOrder
    keyword?: SortOrder
    synonyms?: SortOrder
    deptName?: SortOrder
    bodyPart?: SortOrder
  }

  export type SymptomMappingSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PassportCreateNestedOneWithoutUserInput = {
    create?: XOR<PassportCreateWithoutUserInput, PassportUncheckedCreateWithoutUserInput>
    connectOrCreate?: PassportCreateOrConnectWithoutUserInput
    connect?: PassportWhereUniqueInput
  }

  export type ARCCreateNestedOneWithoutUserInput = {
    create?: XOR<ARCCreateWithoutUserInput, ARCUncheckedCreateWithoutUserInput>
    connectOrCreate?: ARCCreateOrConnectWithoutUserInput
    connect?: ARCWhereUniqueInput
  }

  export type UserDocumentCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDocumentCreateWithoutUserInput, UserDocumentUncheckedCreateWithoutUserInput> | UserDocumentCreateWithoutUserInput[] | UserDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDocumentCreateOrConnectWithoutUserInput | UserDocumentCreateOrConnectWithoutUserInput[]
    createMany?: UserDocumentCreateManyUserInputEnvelope
    connect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
  }

  export type UserCardCreateNestedManyWithoutUserInput = {
    create?: XOR<UserCardCreateWithoutUserInput, UserCardUncheckedCreateWithoutUserInput> | UserCardCreateWithoutUserInput[] | UserCardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCardCreateOrConnectWithoutUserInput | UserCardCreateOrConnectWithoutUserInput[]
    createMany?: UserCardCreateManyUserInputEnvelope
    connect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
  }

  export type SavedPlaceCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedPlaceCreateWithoutUserInput, SavedPlaceUncheckedCreateWithoutUserInput> | SavedPlaceCreateWithoutUserInput[] | SavedPlaceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedPlaceCreateOrConnectWithoutUserInput | SavedPlaceCreateOrConnectWithoutUserInput[]
    createMany?: SavedPlaceCreateManyUserInputEnvelope
    connect?: SavedPlaceWhereUniqueInput | SavedPlaceWhereUniqueInput[]
  }

  export type PassportUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PassportCreateWithoutUserInput, PassportUncheckedCreateWithoutUserInput>
    connectOrCreate?: PassportCreateOrConnectWithoutUserInput
    connect?: PassportWhereUniqueInput
  }

  export type ARCUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ARCCreateWithoutUserInput, ARCUncheckedCreateWithoutUserInput>
    connectOrCreate?: ARCCreateOrConnectWithoutUserInput
    connect?: ARCWhereUniqueInput
  }

  export type UserDocumentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDocumentCreateWithoutUserInput, UserDocumentUncheckedCreateWithoutUserInput> | UserDocumentCreateWithoutUserInput[] | UserDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDocumentCreateOrConnectWithoutUserInput | UserDocumentCreateOrConnectWithoutUserInput[]
    createMany?: UserDocumentCreateManyUserInputEnvelope
    connect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
  }

  export type UserCardUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserCardCreateWithoutUserInput, UserCardUncheckedCreateWithoutUserInput> | UserCardCreateWithoutUserInput[] | UserCardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCardCreateOrConnectWithoutUserInput | UserCardCreateOrConnectWithoutUserInput[]
    createMany?: UserCardCreateManyUserInputEnvelope
    connect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
  }

  export type SavedPlaceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedPlaceCreateWithoutUserInput, SavedPlaceUncheckedCreateWithoutUserInput> | SavedPlaceCreateWithoutUserInput[] | SavedPlaceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedPlaceCreateOrConnectWithoutUserInput | SavedPlaceCreateOrConnectWithoutUserInput[]
    createMany?: SavedPlaceCreateManyUserInputEnvelope
    connect?: SavedPlaceWhereUniqueInput | SavedPlaceWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PassportUpdateOneWithoutUserNestedInput = {
    create?: XOR<PassportCreateWithoutUserInput, PassportUncheckedCreateWithoutUserInput>
    connectOrCreate?: PassportCreateOrConnectWithoutUserInput
    upsert?: PassportUpsertWithoutUserInput
    disconnect?: PassportWhereInput | boolean
    delete?: PassportWhereInput | boolean
    connect?: PassportWhereUniqueInput
    update?: XOR<XOR<PassportUpdateToOneWithWhereWithoutUserInput, PassportUpdateWithoutUserInput>, PassportUncheckedUpdateWithoutUserInput>
  }

  export type ARCUpdateOneWithoutUserNestedInput = {
    create?: XOR<ARCCreateWithoutUserInput, ARCUncheckedCreateWithoutUserInput>
    connectOrCreate?: ARCCreateOrConnectWithoutUserInput
    upsert?: ARCUpsertWithoutUserInput
    disconnect?: ARCWhereInput | boolean
    delete?: ARCWhereInput | boolean
    connect?: ARCWhereUniqueInput
    update?: XOR<XOR<ARCUpdateToOneWithWhereWithoutUserInput, ARCUpdateWithoutUserInput>, ARCUncheckedUpdateWithoutUserInput>
  }

  export type UserDocumentUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDocumentCreateWithoutUserInput, UserDocumentUncheckedCreateWithoutUserInput> | UserDocumentCreateWithoutUserInput[] | UserDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDocumentCreateOrConnectWithoutUserInput | UserDocumentCreateOrConnectWithoutUserInput[]
    upsert?: UserDocumentUpsertWithWhereUniqueWithoutUserInput | UserDocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDocumentCreateManyUserInputEnvelope
    set?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    disconnect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    delete?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    connect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    update?: UserDocumentUpdateWithWhereUniqueWithoutUserInput | UserDocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDocumentUpdateManyWithWhereWithoutUserInput | UserDocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDocumentScalarWhereInput | UserDocumentScalarWhereInput[]
  }

  export type UserCardUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserCardCreateWithoutUserInput, UserCardUncheckedCreateWithoutUserInput> | UserCardCreateWithoutUserInput[] | UserCardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCardCreateOrConnectWithoutUserInput | UserCardCreateOrConnectWithoutUserInput[]
    upsert?: UserCardUpsertWithWhereUniqueWithoutUserInput | UserCardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserCardCreateManyUserInputEnvelope
    set?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    disconnect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    delete?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    connect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    update?: UserCardUpdateWithWhereUniqueWithoutUserInput | UserCardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserCardUpdateManyWithWhereWithoutUserInput | UserCardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserCardScalarWhereInput | UserCardScalarWhereInput[]
  }

  export type SavedPlaceUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedPlaceCreateWithoutUserInput, SavedPlaceUncheckedCreateWithoutUserInput> | SavedPlaceCreateWithoutUserInput[] | SavedPlaceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedPlaceCreateOrConnectWithoutUserInput | SavedPlaceCreateOrConnectWithoutUserInput[]
    upsert?: SavedPlaceUpsertWithWhereUniqueWithoutUserInput | SavedPlaceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedPlaceCreateManyUserInputEnvelope
    set?: SavedPlaceWhereUniqueInput | SavedPlaceWhereUniqueInput[]
    disconnect?: SavedPlaceWhereUniqueInput | SavedPlaceWhereUniqueInput[]
    delete?: SavedPlaceWhereUniqueInput | SavedPlaceWhereUniqueInput[]
    connect?: SavedPlaceWhereUniqueInput | SavedPlaceWhereUniqueInput[]
    update?: SavedPlaceUpdateWithWhereUniqueWithoutUserInput | SavedPlaceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedPlaceUpdateManyWithWhereWithoutUserInput | SavedPlaceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedPlaceScalarWhereInput | SavedPlaceScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PassportUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PassportCreateWithoutUserInput, PassportUncheckedCreateWithoutUserInput>
    connectOrCreate?: PassportCreateOrConnectWithoutUserInput
    upsert?: PassportUpsertWithoutUserInput
    disconnect?: PassportWhereInput | boolean
    delete?: PassportWhereInput | boolean
    connect?: PassportWhereUniqueInput
    update?: XOR<XOR<PassportUpdateToOneWithWhereWithoutUserInput, PassportUpdateWithoutUserInput>, PassportUncheckedUpdateWithoutUserInput>
  }

  export type ARCUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ARCCreateWithoutUserInput, ARCUncheckedCreateWithoutUserInput>
    connectOrCreate?: ARCCreateOrConnectWithoutUserInput
    upsert?: ARCUpsertWithoutUserInput
    disconnect?: ARCWhereInput | boolean
    delete?: ARCWhereInput | boolean
    connect?: ARCWhereUniqueInput
    update?: XOR<XOR<ARCUpdateToOneWithWhereWithoutUserInput, ARCUpdateWithoutUserInput>, ARCUncheckedUpdateWithoutUserInput>
  }

  export type UserDocumentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDocumentCreateWithoutUserInput, UserDocumentUncheckedCreateWithoutUserInput> | UserDocumentCreateWithoutUserInput[] | UserDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDocumentCreateOrConnectWithoutUserInput | UserDocumentCreateOrConnectWithoutUserInput[]
    upsert?: UserDocumentUpsertWithWhereUniqueWithoutUserInput | UserDocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDocumentCreateManyUserInputEnvelope
    set?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    disconnect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    delete?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    connect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    update?: UserDocumentUpdateWithWhereUniqueWithoutUserInput | UserDocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDocumentUpdateManyWithWhereWithoutUserInput | UserDocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDocumentScalarWhereInput | UserDocumentScalarWhereInput[]
  }

  export type UserCardUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserCardCreateWithoutUserInput, UserCardUncheckedCreateWithoutUserInput> | UserCardCreateWithoutUserInput[] | UserCardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCardCreateOrConnectWithoutUserInput | UserCardCreateOrConnectWithoutUserInput[]
    upsert?: UserCardUpsertWithWhereUniqueWithoutUserInput | UserCardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserCardCreateManyUserInputEnvelope
    set?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    disconnect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    delete?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    connect?: UserCardWhereUniqueInput | UserCardWhereUniqueInput[]
    update?: UserCardUpdateWithWhereUniqueWithoutUserInput | UserCardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserCardUpdateManyWithWhereWithoutUserInput | UserCardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserCardScalarWhereInput | UserCardScalarWhereInput[]
  }

  export type SavedPlaceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedPlaceCreateWithoutUserInput, SavedPlaceUncheckedCreateWithoutUserInput> | SavedPlaceCreateWithoutUserInput[] | SavedPlaceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedPlaceCreateOrConnectWithoutUserInput | SavedPlaceCreateOrConnectWithoutUserInput[]
    upsert?: SavedPlaceUpsertWithWhereUniqueWithoutUserInput | SavedPlaceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedPlaceCreateManyUserInputEnvelope
    set?: SavedPlaceWhereUniqueInput | SavedPlaceWhereUniqueInput[]
    disconnect?: SavedPlaceWhereUniqueInput | SavedPlaceWhereUniqueInput[]
    delete?: SavedPlaceWhereUniqueInput | SavedPlaceWhereUniqueInput[]
    connect?: SavedPlaceWhereUniqueInput | SavedPlaceWhereUniqueInput[]
    update?: SavedPlaceUpdateWithWhereUniqueWithoutUserInput | SavedPlaceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedPlaceUpdateManyWithWhereWithoutUserInput | SavedPlaceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedPlaceScalarWhereInput | SavedPlaceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPassportInput = {
    create?: XOR<UserCreateWithoutPassportInput, UserUncheckedCreateWithoutPassportInput>
    connectOrCreate?: UserCreateOrConnectWithoutPassportInput
    connect?: UserWhereUniqueInput
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type UserUpdateOneRequiredWithoutPassportNestedInput = {
    create?: XOR<UserCreateWithoutPassportInput, UserUncheckedCreateWithoutPassportInput>
    connectOrCreate?: UserCreateOrConnectWithoutPassportInput
    upsert?: UserUpsertWithoutPassportInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPassportInput, UserUpdateWithoutPassportInput>, UserUncheckedUpdateWithoutPassportInput>
  }

  export type UserCreateNestedOneWithoutARCInput = {
    create?: XOR<UserCreateWithoutARCInput, UserUncheckedCreateWithoutARCInput>
    connectOrCreate?: UserCreateOrConnectWithoutARCInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutARCNestedInput = {
    create?: XOR<UserCreateWithoutARCInput, UserUncheckedCreateWithoutARCInput>
    connectOrCreate?: UserCreateOrConnectWithoutARCInput
    upsert?: UserUpsertWithoutARCInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutARCInput, UserUpdateWithoutARCInput>, UserUncheckedUpdateWithoutARCInput>
  }

  export type UserCreateNestedOneWithoutUserDocumentInput = {
    create?: XOR<UserCreateWithoutUserDocumentInput, UserUncheckedCreateWithoutUserDocumentInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserDocumentInput
    connect?: UserWhereUniqueInput
  }

  export type EnumDocTypeFieldUpdateOperationsInput = {
    set?: $Enums.DocType
  }

  export type UserUpdateOneRequiredWithoutUserDocumentNestedInput = {
    create?: XOR<UserCreateWithoutUserDocumentInput, UserUncheckedCreateWithoutUserDocumentInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserDocumentInput
    upsert?: UserUpsertWithoutUserDocumentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserDocumentInput, UserUpdateWithoutUserDocumentInput>, UserUncheckedUpdateWithoutUserDocumentInput>
  }

  export type UserCreateNestedOneWithoutUserCardInput = {
    create?: XOR<UserCreateWithoutUserCardInput, UserUncheckedCreateWithoutUserCardInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserCardInput
    connect?: UserWhereUniqueInput
  }

  export type EnumCardTypeFieldUpdateOperationsInput = {
    set?: $Enums.CardType
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutUserCardNestedInput = {
    create?: XOR<UserCreateWithoutUserCardInput, UserUncheckedCreateWithoutUserCardInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserCardInput
    upsert?: UserUpsertWithoutUserCardInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserCardInput, UserUpdateWithoutUserCardInput>, UserUncheckedUpdateWithoutUserCardInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumCouponCategoryFieldUpdateOperationsInput = {
    set?: $Enums.CouponCategory
  }

  export type UserCreateNestedOneWithoutSavedPlaceInput = {
    create?: XOR<UserCreateWithoutSavedPlaceInput, UserUncheckedCreateWithoutSavedPlaceInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedPlaceInput
    connect?: UserWhereUniqueInput
  }

  export type EnumPlaceCategoryFieldUpdateOperationsInput = {
    set?: $Enums.PlaceCategory
  }

  export type UserUpdateOneRequiredWithoutSavedPlaceNestedInput = {
    create?: XOR<UserCreateWithoutSavedPlaceInput, UserUncheckedCreateWithoutSavedPlaceInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedPlaceInput
    upsert?: UserUpsertWithoutSavedPlaceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSavedPlaceInput, UserUpdateWithoutSavedPlaceInput>, UserUncheckedUpdateWithoutSavedPlaceInput>
  }

  export type HospitalDeptCreateNestedManyWithoutHospitalInput = {
    create?: XOR<HospitalDeptCreateWithoutHospitalInput, HospitalDeptUncheckedCreateWithoutHospitalInput> | HospitalDeptCreateWithoutHospitalInput[] | HospitalDeptUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: HospitalDeptCreateOrConnectWithoutHospitalInput | HospitalDeptCreateOrConnectWithoutHospitalInput[]
    createMany?: HospitalDeptCreateManyHospitalInputEnvelope
    connect?: HospitalDeptWhereUniqueInput | HospitalDeptWhereUniqueInput[]
  }

  export type HospitalLangCreateNestedManyWithoutHospitalInput = {
    create?: XOR<HospitalLangCreateWithoutHospitalInput, HospitalLangUncheckedCreateWithoutHospitalInput> | HospitalLangCreateWithoutHospitalInput[] | HospitalLangUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: HospitalLangCreateOrConnectWithoutHospitalInput | HospitalLangCreateOrConnectWithoutHospitalInput[]
    createMany?: HospitalLangCreateManyHospitalInputEnvelope
    connect?: HospitalLangWhereUniqueInput | HospitalLangWhereUniqueInput[]
  }

  export type HospitalReviewCreateNestedOneWithoutHospitalInput = {
    create?: XOR<HospitalReviewCreateWithoutHospitalInput, HospitalReviewUncheckedCreateWithoutHospitalInput>
    connectOrCreate?: HospitalReviewCreateOrConnectWithoutHospitalInput
    connect?: HospitalReviewWhereUniqueInput
  }

  export type HospitalDeptUncheckedCreateNestedManyWithoutHospitalInput = {
    create?: XOR<HospitalDeptCreateWithoutHospitalInput, HospitalDeptUncheckedCreateWithoutHospitalInput> | HospitalDeptCreateWithoutHospitalInput[] | HospitalDeptUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: HospitalDeptCreateOrConnectWithoutHospitalInput | HospitalDeptCreateOrConnectWithoutHospitalInput[]
    createMany?: HospitalDeptCreateManyHospitalInputEnvelope
    connect?: HospitalDeptWhereUniqueInput | HospitalDeptWhereUniqueInput[]
  }

  export type HospitalLangUncheckedCreateNestedManyWithoutHospitalInput = {
    create?: XOR<HospitalLangCreateWithoutHospitalInput, HospitalLangUncheckedCreateWithoutHospitalInput> | HospitalLangCreateWithoutHospitalInput[] | HospitalLangUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: HospitalLangCreateOrConnectWithoutHospitalInput | HospitalLangCreateOrConnectWithoutHospitalInput[]
    createMany?: HospitalLangCreateManyHospitalInputEnvelope
    connect?: HospitalLangWhereUniqueInput | HospitalLangWhereUniqueInput[]
  }

  export type HospitalReviewUncheckedCreateNestedOneWithoutHospitalInput = {
    create?: XOR<HospitalReviewCreateWithoutHospitalInput, HospitalReviewUncheckedCreateWithoutHospitalInput>
    connectOrCreate?: HospitalReviewCreateOrConnectWithoutHospitalInput
    connect?: HospitalReviewWhereUniqueInput
  }

  export type HospitalDeptUpdateManyWithoutHospitalNestedInput = {
    create?: XOR<HospitalDeptCreateWithoutHospitalInput, HospitalDeptUncheckedCreateWithoutHospitalInput> | HospitalDeptCreateWithoutHospitalInput[] | HospitalDeptUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: HospitalDeptCreateOrConnectWithoutHospitalInput | HospitalDeptCreateOrConnectWithoutHospitalInput[]
    upsert?: HospitalDeptUpsertWithWhereUniqueWithoutHospitalInput | HospitalDeptUpsertWithWhereUniqueWithoutHospitalInput[]
    createMany?: HospitalDeptCreateManyHospitalInputEnvelope
    set?: HospitalDeptWhereUniqueInput | HospitalDeptWhereUniqueInput[]
    disconnect?: HospitalDeptWhereUniqueInput | HospitalDeptWhereUniqueInput[]
    delete?: HospitalDeptWhereUniqueInput | HospitalDeptWhereUniqueInput[]
    connect?: HospitalDeptWhereUniqueInput | HospitalDeptWhereUniqueInput[]
    update?: HospitalDeptUpdateWithWhereUniqueWithoutHospitalInput | HospitalDeptUpdateWithWhereUniqueWithoutHospitalInput[]
    updateMany?: HospitalDeptUpdateManyWithWhereWithoutHospitalInput | HospitalDeptUpdateManyWithWhereWithoutHospitalInput[]
    deleteMany?: HospitalDeptScalarWhereInput | HospitalDeptScalarWhereInput[]
  }

  export type HospitalLangUpdateManyWithoutHospitalNestedInput = {
    create?: XOR<HospitalLangCreateWithoutHospitalInput, HospitalLangUncheckedCreateWithoutHospitalInput> | HospitalLangCreateWithoutHospitalInput[] | HospitalLangUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: HospitalLangCreateOrConnectWithoutHospitalInput | HospitalLangCreateOrConnectWithoutHospitalInput[]
    upsert?: HospitalLangUpsertWithWhereUniqueWithoutHospitalInput | HospitalLangUpsertWithWhereUniqueWithoutHospitalInput[]
    createMany?: HospitalLangCreateManyHospitalInputEnvelope
    set?: HospitalLangWhereUniqueInput | HospitalLangWhereUniqueInput[]
    disconnect?: HospitalLangWhereUniqueInput | HospitalLangWhereUniqueInput[]
    delete?: HospitalLangWhereUniqueInput | HospitalLangWhereUniqueInput[]
    connect?: HospitalLangWhereUniqueInput | HospitalLangWhereUniqueInput[]
    update?: HospitalLangUpdateWithWhereUniqueWithoutHospitalInput | HospitalLangUpdateWithWhereUniqueWithoutHospitalInput[]
    updateMany?: HospitalLangUpdateManyWithWhereWithoutHospitalInput | HospitalLangUpdateManyWithWhereWithoutHospitalInput[]
    deleteMany?: HospitalLangScalarWhereInput | HospitalLangScalarWhereInput[]
  }

  export type HospitalReviewUpdateOneWithoutHospitalNestedInput = {
    create?: XOR<HospitalReviewCreateWithoutHospitalInput, HospitalReviewUncheckedCreateWithoutHospitalInput>
    connectOrCreate?: HospitalReviewCreateOrConnectWithoutHospitalInput
    upsert?: HospitalReviewUpsertWithoutHospitalInput
    disconnect?: HospitalReviewWhereInput | boolean
    delete?: HospitalReviewWhereInput | boolean
    connect?: HospitalReviewWhereUniqueInput
    update?: XOR<XOR<HospitalReviewUpdateToOneWithWhereWithoutHospitalInput, HospitalReviewUpdateWithoutHospitalInput>, HospitalReviewUncheckedUpdateWithoutHospitalInput>
  }

  export type HospitalDeptUncheckedUpdateManyWithoutHospitalNestedInput = {
    create?: XOR<HospitalDeptCreateWithoutHospitalInput, HospitalDeptUncheckedCreateWithoutHospitalInput> | HospitalDeptCreateWithoutHospitalInput[] | HospitalDeptUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: HospitalDeptCreateOrConnectWithoutHospitalInput | HospitalDeptCreateOrConnectWithoutHospitalInput[]
    upsert?: HospitalDeptUpsertWithWhereUniqueWithoutHospitalInput | HospitalDeptUpsertWithWhereUniqueWithoutHospitalInput[]
    createMany?: HospitalDeptCreateManyHospitalInputEnvelope
    set?: HospitalDeptWhereUniqueInput | HospitalDeptWhereUniqueInput[]
    disconnect?: HospitalDeptWhereUniqueInput | HospitalDeptWhereUniqueInput[]
    delete?: HospitalDeptWhereUniqueInput | HospitalDeptWhereUniqueInput[]
    connect?: HospitalDeptWhereUniqueInput | HospitalDeptWhereUniqueInput[]
    update?: HospitalDeptUpdateWithWhereUniqueWithoutHospitalInput | HospitalDeptUpdateWithWhereUniqueWithoutHospitalInput[]
    updateMany?: HospitalDeptUpdateManyWithWhereWithoutHospitalInput | HospitalDeptUpdateManyWithWhereWithoutHospitalInput[]
    deleteMany?: HospitalDeptScalarWhereInput | HospitalDeptScalarWhereInput[]
  }

  export type HospitalLangUncheckedUpdateManyWithoutHospitalNestedInput = {
    create?: XOR<HospitalLangCreateWithoutHospitalInput, HospitalLangUncheckedCreateWithoutHospitalInput> | HospitalLangCreateWithoutHospitalInput[] | HospitalLangUncheckedCreateWithoutHospitalInput[]
    connectOrCreate?: HospitalLangCreateOrConnectWithoutHospitalInput | HospitalLangCreateOrConnectWithoutHospitalInput[]
    upsert?: HospitalLangUpsertWithWhereUniqueWithoutHospitalInput | HospitalLangUpsertWithWhereUniqueWithoutHospitalInput[]
    createMany?: HospitalLangCreateManyHospitalInputEnvelope
    set?: HospitalLangWhereUniqueInput | HospitalLangWhereUniqueInput[]
    disconnect?: HospitalLangWhereUniqueInput | HospitalLangWhereUniqueInput[]
    delete?: HospitalLangWhereUniqueInput | HospitalLangWhereUniqueInput[]
    connect?: HospitalLangWhereUniqueInput | HospitalLangWhereUniqueInput[]
    update?: HospitalLangUpdateWithWhereUniqueWithoutHospitalInput | HospitalLangUpdateWithWhereUniqueWithoutHospitalInput[]
    updateMany?: HospitalLangUpdateManyWithWhereWithoutHospitalInput | HospitalLangUpdateManyWithWhereWithoutHospitalInput[]
    deleteMany?: HospitalLangScalarWhereInput | HospitalLangScalarWhereInput[]
  }

  export type HospitalReviewUncheckedUpdateOneWithoutHospitalNestedInput = {
    create?: XOR<HospitalReviewCreateWithoutHospitalInput, HospitalReviewUncheckedCreateWithoutHospitalInput>
    connectOrCreate?: HospitalReviewCreateOrConnectWithoutHospitalInput
    upsert?: HospitalReviewUpsertWithoutHospitalInput
    disconnect?: HospitalReviewWhereInput | boolean
    delete?: HospitalReviewWhereInput | boolean
    connect?: HospitalReviewWhereUniqueInput
    update?: XOR<XOR<HospitalReviewUpdateToOneWithWhereWithoutHospitalInput, HospitalReviewUpdateWithoutHospitalInput>, HospitalReviewUncheckedUpdateWithoutHospitalInput>
  }

  export type HospitalCreateNestedOneWithoutHospitalDeptInput = {
    create?: XOR<HospitalCreateWithoutHospitalDeptInput, HospitalUncheckedCreateWithoutHospitalDeptInput>
    connectOrCreate?: HospitalCreateOrConnectWithoutHospitalDeptInput
    connect?: HospitalWhereUniqueInput
  }

  export type HospitalUpdateOneRequiredWithoutHospitalDeptNestedInput = {
    create?: XOR<HospitalCreateWithoutHospitalDeptInput, HospitalUncheckedCreateWithoutHospitalDeptInput>
    connectOrCreate?: HospitalCreateOrConnectWithoutHospitalDeptInput
    upsert?: HospitalUpsertWithoutHospitalDeptInput
    connect?: HospitalWhereUniqueInput
    update?: XOR<XOR<HospitalUpdateToOneWithWhereWithoutHospitalDeptInput, HospitalUpdateWithoutHospitalDeptInput>, HospitalUncheckedUpdateWithoutHospitalDeptInput>
  }

  export type HospitalCreateNestedOneWithoutHospitalLangInput = {
    create?: XOR<HospitalCreateWithoutHospitalLangInput, HospitalUncheckedCreateWithoutHospitalLangInput>
    connectOrCreate?: HospitalCreateOrConnectWithoutHospitalLangInput
    connect?: HospitalWhereUniqueInput
  }

  export type HospitalUpdateOneRequiredWithoutHospitalLangNestedInput = {
    create?: XOR<HospitalCreateWithoutHospitalLangInput, HospitalUncheckedCreateWithoutHospitalLangInput>
    connectOrCreate?: HospitalCreateOrConnectWithoutHospitalLangInput
    upsert?: HospitalUpsertWithoutHospitalLangInput
    connect?: HospitalWhereUniqueInput
    update?: XOR<XOR<HospitalUpdateToOneWithWhereWithoutHospitalLangInput, HospitalUpdateWithoutHospitalLangInput>, HospitalUncheckedUpdateWithoutHospitalLangInput>
  }

  export type HospitalCreateNestedOneWithoutHospitalReviewInput = {
    create?: XOR<HospitalCreateWithoutHospitalReviewInput, HospitalUncheckedCreateWithoutHospitalReviewInput>
    connectOrCreate?: HospitalCreateOrConnectWithoutHospitalReviewInput
    connect?: HospitalWhereUniqueInput
  }

  export type HospitalUpdateOneRequiredWithoutHospitalReviewNestedInput = {
    create?: XOR<HospitalCreateWithoutHospitalReviewInput, HospitalUncheckedCreateWithoutHospitalReviewInput>
    connectOrCreate?: HospitalCreateOrConnectWithoutHospitalReviewInput
    upsert?: HospitalUpsertWithoutHospitalReviewInput
    connect?: HospitalWhereUniqueInput
    update?: XOR<XOR<HospitalUpdateToOneWithWhereWithoutHospitalReviewInput, HospitalUpdateWithoutHospitalReviewInput>, HospitalUncheckedUpdateWithoutHospitalReviewInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[]
    notIn?: $Enums.Gender[]
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[]
    notIn?: $Enums.Gender[]
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedEnumDocTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocType | EnumDocTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocType[]
    notIn?: $Enums.DocType[]
    not?: NestedEnumDocTypeFilter<$PrismaModel> | $Enums.DocType
  }

  export type NestedEnumDocTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocType | EnumDocTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocType[]
    notIn?: $Enums.DocType[]
    not?: NestedEnumDocTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocTypeFilter<$PrismaModel>
    _max?: NestedEnumDocTypeFilter<$PrismaModel>
  }

  export type NestedEnumCardTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CardType | EnumCardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CardType[]
    notIn?: $Enums.CardType[]
    not?: NestedEnumCardTypeFilter<$PrismaModel> | $Enums.CardType
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumCardTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CardType | EnumCardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CardType[]
    notIn?: $Enums.CardType[]
    not?: NestedEnumCardTypeWithAggregatesFilter<$PrismaModel> | $Enums.CardType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCardTypeFilter<$PrismaModel>
    _max?: NestedEnumCardTypeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumCouponCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.CouponCategory | EnumCouponCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CouponCategory[]
    notIn?: $Enums.CouponCategory[]
    not?: NestedEnumCouponCategoryFilter<$PrismaModel> | $Enums.CouponCategory
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCouponCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CouponCategory | EnumCouponCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.CouponCategory[]
    notIn?: $Enums.CouponCategory[]
    not?: NestedEnumCouponCategoryWithAggregatesFilter<$PrismaModel> | $Enums.CouponCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCouponCategoryFilter<$PrismaModel>
    _max?: NestedEnumCouponCategoryFilter<$PrismaModel>
  }

  export type NestedEnumPlaceCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PlaceCategory | EnumPlaceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PlaceCategory[]
    notIn?: $Enums.PlaceCategory[]
    not?: NestedEnumPlaceCategoryFilter<$PrismaModel> | $Enums.PlaceCategory
  }

  export type NestedEnumPlaceCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlaceCategory | EnumPlaceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PlaceCategory[]
    notIn?: $Enums.PlaceCategory[]
    not?: NestedEnumPlaceCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PlaceCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlaceCategoryFilter<$PrismaModel>
    _max?: NestedEnumPlaceCategoryFilter<$PrismaModel>
  }

  export type PassportCreateWithoutUserInput = {
    passportNumber: string
    gender: $Enums.Gender
    issueDate: Date | string
    expiryDate: Date | string
    userPhotoUrl: string
    createdAt?: Date | string
  }

  export type PassportUncheckedCreateWithoutUserInput = {
    id?: number
    passportNumber: string
    gender: $Enums.Gender
    issueDate: Date | string
    expiryDate: Date | string
    userPhotoUrl: string
    createdAt?: Date | string
  }

  export type PassportCreateOrConnectWithoutUserInput = {
    where: PassportWhereUniqueInput
    create: XOR<PassportCreateWithoutUserInput, PassportUncheckedCreateWithoutUserInput>
  }

  export type ARCCreateWithoutUserInput = {
    arcNumber: string
    residenceStatus: string
    issueDate: Date | string
    userPhotoUrl: string
    createdAt?: Date | string
  }

  export type ARCUncheckedCreateWithoutUserInput = {
    id?: number
    arcNumber: string
    residenceStatus: string
    issueDate: Date | string
    userPhotoUrl: string
    createdAt?: Date | string
  }

  export type ARCCreateOrConnectWithoutUserInput = {
    where: ARCWhereUniqueInput
    create: XOR<ARCCreateWithoutUserInput, ARCUncheckedCreateWithoutUserInput>
  }

  export type UserDocumentCreateWithoutUserInput = {
    docType: $Enums.DocType
    fileUrl: string
    createdAt?: Date | string
  }

  export type UserDocumentUncheckedCreateWithoutUserInput = {
    id?: number
    docType: $Enums.DocType
    fileUrl: string
    createdAt?: Date | string
  }

  export type UserDocumentCreateOrConnectWithoutUserInput = {
    where: UserDocumentWhereUniqueInput
    create: XOR<UserDocumentCreateWithoutUserInput, UserDocumentUncheckedCreateWithoutUserInput>
  }

  export type UserDocumentCreateManyUserInputEnvelope = {
    data: UserDocumentCreateManyUserInput | UserDocumentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserCardCreateWithoutUserInput = {
    cardType: $Enums.CardType
    cardNumber: string
    balance?: Decimal | DecimalJsLike | number | string
    isDefault?: boolean
    createdAt?: Date | string
  }

  export type UserCardUncheckedCreateWithoutUserInput = {
    id?: number
    cardType: $Enums.CardType
    cardNumber: string
    balance?: Decimal | DecimalJsLike | number | string
    isDefault?: boolean
    createdAt?: Date | string
  }

  export type UserCardCreateOrConnectWithoutUserInput = {
    where: UserCardWhereUniqueInput
    create: XOR<UserCardCreateWithoutUserInput, UserCardUncheckedCreateWithoutUserInput>
  }

  export type UserCardCreateManyUserInputEnvelope = {
    data: UserCardCreateManyUserInput | UserCardCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SavedPlaceCreateWithoutUserInput = {
    placeName: string
    category: $Enums.PlaceCategory
    latitude: string
    longitude: string
    address: string
    openHours: string
    phone: string
  }

  export type SavedPlaceUncheckedCreateWithoutUserInput = {
    id?: number
    placeName: string
    category: $Enums.PlaceCategory
    latitude: string
    longitude: string
    address: string
    openHours: string
    phone: string
  }

  export type SavedPlaceCreateOrConnectWithoutUserInput = {
    where: SavedPlaceWhereUniqueInput
    create: XOR<SavedPlaceCreateWithoutUserInput, SavedPlaceUncheckedCreateWithoutUserInput>
  }

  export type SavedPlaceCreateManyUserInputEnvelope = {
    data: SavedPlaceCreateManyUserInput | SavedPlaceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PassportUpsertWithoutUserInput = {
    update: XOR<PassportUpdateWithoutUserInput, PassportUncheckedUpdateWithoutUserInput>
    create: XOR<PassportCreateWithoutUserInput, PassportUncheckedCreateWithoutUserInput>
    where?: PassportWhereInput
  }

  export type PassportUpdateToOneWithWhereWithoutUserInput = {
    where?: PassportWhereInput
    data: XOR<PassportUpdateWithoutUserInput, PassportUncheckedUpdateWithoutUserInput>
  }

  export type PassportUpdateWithoutUserInput = {
    passportNumber?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    userPhotoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PassportUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    passportNumber?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    userPhotoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ARCUpsertWithoutUserInput = {
    update: XOR<ARCUpdateWithoutUserInput, ARCUncheckedUpdateWithoutUserInput>
    create: XOR<ARCCreateWithoutUserInput, ARCUncheckedCreateWithoutUserInput>
    where?: ARCWhereInput
  }

  export type ARCUpdateToOneWithWhereWithoutUserInput = {
    where?: ARCWhereInput
    data: XOR<ARCUpdateWithoutUserInput, ARCUncheckedUpdateWithoutUserInput>
  }

  export type ARCUpdateWithoutUserInput = {
    arcNumber?: StringFieldUpdateOperationsInput | string
    residenceStatus?: StringFieldUpdateOperationsInput | string
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    userPhotoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ARCUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    arcNumber?: StringFieldUpdateOperationsInput | string
    residenceStatus?: StringFieldUpdateOperationsInput | string
    issueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    userPhotoUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDocumentUpsertWithWhereUniqueWithoutUserInput = {
    where: UserDocumentWhereUniqueInput
    update: XOR<UserDocumentUpdateWithoutUserInput, UserDocumentUncheckedUpdateWithoutUserInput>
    create: XOR<UserDocumentCreateWithoutUserInput, UserDocumentUncheckedCreateWithoutUserInput>
  }

  export type UserDocumentUpdateWithWhereUniqueWithoutUserInput = {
    where: UserDocumentWhereUniqueInput
    data: XOR<UserDocumentUpdateWithoutUserInput, UserDocumentUncheckedUpdateWithoutUserInput>
  }

  export type UserDocumentUpdateManyWithWhereWithoutUserInput = {
    where: UserDocumentScalarWhereInput
    data: XOR<UserDocumentUpdateManyMutationInput, UserDocumentUncheckedUpdateManyWithoutUserInput>
  }

  export type UserDocumentScalarWhereInput = {
    AND?: UserDocumentScalarWhereInput | UserDocumentScalarWhereInput[]
    OR?: UserDocumentScalarWhereInput[]
    NOT?: UserDocumentScalarWhereInput | UserDocumentScalarWhereInput[]
    id?: IntFilter<"UserDocument"> | number
    userId?: IntFilter<"UserDocument"> | number
    docType?: EnumDocTypeFilter<"UserDocument"> | $Enums.DocType
    fileUrl?: StringFilter<"UserDocument"> | string
    createdAt?: DateTimeFilter<"UserDocument"> | Date | string
  }

  export type UserCardUpsertWithWhereUniqueWithoutUserInput = {
    where: UserCardWhereUniqueInput
    update: XOR<UserCardUpdateWithoutUserInput, UserCardUncheckedUpdateWithoutUserInput>
    create: XOR<UserCardCreateWithoutUserInput, UserCardUncheckedCreateWithoutUserInput>
  }

  export type UserCardUpdateWithWhereUniqueWithoutUserInput = {
    where: UserCardWhereUniqueInput
    data: XOR<UserCardUpdateWithoutUserInput, UserCardUncheckedUpdateWithoutUserInput>
  }

  export type UserCardUpdateManyWithWhereWithoutUserInput = {
    where: UserCardScalarWhereInput
    data: XOR<UserCardUpdateManyMutationInput, UserCardUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCardScalarWhereInput = {
    AND?: UserCardScalarWhereInput | UserCardScalarWhereInput[]
    OR?: UserCardScalarWhereInput[]
    NOT?: UserCardScalarWhereInput | UserCardScalarWhereInput[]
    id?: IntFilter<"UserCard"> | number
    userId?: IntFilter<"UserCard"> | number
    cardType?: EnumCardTypeFilter<"UserCard"> | $Enums.CardType
    cardNumber?: StringFilter<"UserCard"> | string
    balance?: DecimalFilter<"UserCard"> | Decimal | DecimalJsLike | number | string
    isDefault?: BoolFilter<"UserCard"> | boolean
    createdAt?: DateTimeFilter<"UserCard"> | Date | string
  }

  export type SavedPlaceUpsertWithWhereUniqueWithoutUserInput = {
    where: SavedPlaceWhereUniqueInput
    update: XOR<SavedPlaceUpdateWithoutUserInput, SavedPlaceUncheckedUpdateWithoutUserInput>
    create: XOR<SavedPlaceCreateWithoutUserInput, SavedPlaceUncheckedCreateWithoutUserInput>
  }

  export type SavedPlaceUpdateWithWhereUniqueWithoutUserInput = {
    where: SavedPlaceWhereUniqueInput
    data: XOR<SavedPlaceUpdateWithoutUserInput, SavedPlaceUncheckedUpdateWithoutUserInput>
  }

  export type SavedPlaceUpdateManyWithWhereWithoutUserInput = {
    where: SavedPlaceScalarWhereInput
    data: XOR<SavedPlaceUpdateManyMutationInput, SavedPlaceUncheckedUpdateManyWithoutUserInput>
  }

  export type SavedPlaceScalarWhereInput = {
    AND?: SavedPlaceScalarWhereInput | SavedPlaceScalarWhereInput[]
    OR?: SavedPlaceScalarWhereInput[]
    NOT?: SavedPlaceScalarWhereInput | SavedPlaceScalarWhereInput[]
    id?: IntFilter<"SavedPlace"> | number
    userId?: IntFilter<"SavedPlace"> | number
    placeName?: StringFilter<"SavedPlace"> | string
    category?: EnumPlaceCategoryFilter<"SavedPlace"> | $Enums.PlaceCategory
    latitude?: StringFilter<"SavedPlace"> | string
    longitude?: StringFilter<"SavedPlace"> | string
    address?: StringFilter<"SavedPlace"> | string
    openHours?: StringFilter<"SavedPlace"> | string
    phone?: StringFilter<"SavedPlace"> | string
  }

  export type UserCreateWithoutPassportInput = {
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ARC?: ARCCreateNestedOneWithoutUserInput
    UserDocument?: UserDocumentCreateNestedManyWithoutUserInput
    UserCard?: UserCardCreateNestedManyWithoutUserInput
    SavedPlace?: SavedPlaceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPassportInput = {
    id?: number
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ARC?: ARCUncheckedCreateNestedOneWithoutUserInput
    UserDocument?: UserDocumentUncheckedCreateNestedManyWithoutUserInput
    UserCard?: UserCardUncheckedCreateNestedManyWithoutUserInput
    SavedPlace?: SavedPlaceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPassportInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPassportInput, UserUncheckedCreateWithoutPassportInput>
  }

  export type UserUpsertWithoutPassportInput = {
    update: XOR<UserUpdateWithoutPassportInput, UserUncheckedUpdateWithoutPassportInput>
    create: XOR<UserCreateWithoutPassportInput, UserUncheckedCreateWithoutPassportInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPassportInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPassportInput, UserUncheckedUpdateWithoutPassportInput>
  }

  export type UserUpdateWithoutPassportInput = {
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ARC?: ARCUpdateOneWithoutUserNestedInput
    UserDocument?: UserDocumentUpdateManyWithoutUserNestedInput
    UserCard?: UserCardUpdateManyWithoutUserNestedInput
    SavedPlace?: SavedPlaceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPassportInput = {
    id?: IntFieldUpdateOperationsInput | number
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ARC?: ARCUncheckedUpdateOneWithoutUserNestedInput
    UserDocument?: UserDocumentUncheckedUpdateManyWithoutUserNestedInput
    UserCard?: UserCardUncheckedUpdateManyWithoutUserNestedInput
    SavedPlace?: SavedPlaceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutARCInput = {
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Passport?: PassportCreateNestedOneWithoutUserInput
    UserDocument?: UserDocumentCreateNestedManyWithoutUserInput
    UserCard?: UserCardCreateNestedManyWithoutUserInput
    SavedPlace?: SavedPlaceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutARCInput = {
    id?: number
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Passport?: PassportUncheckedCreateNestedOneWithoutUserInput
    UserDocument?: UserDocumentUncheckedCreateNestedManyWithoutUserInput
    UserCard?: UserCardUncheckedCreateNestedManyWithoutUserInput
    SavedPlace?: SavedPlaceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutARCInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutARCInput, UserUncheckedCreateWithoutARCInput>
  }

  export type UserUpsertWithoutARCInput = {
    update: XOR<UserUpdateWithoutARCInput, UserUncheckedUpdateWithoutARCInput>
    create: XOR<UserCreateWithoutARCInput, UserUncheckedCreateWithoutARCInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutARCInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutARCInput, UserUncheckedUpdateWithoutARCInput>
  }

  export type UserUpdateWithoutARCInput = {
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Passport?: PassportUpdateOneWithoutUserNestedInput
    UserDocument?: UserDocumentUpdateManyWithoutUserNestedInput
    UserCard?: UserCardUpdateManyWithoutUserNestedInput
    SavedPlace?: SavedPlaceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutARCInput = {
    id?: IntFieldUpdateOperationsInput | number
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Passport?: PassportUncheckedUpdateOneWithoutUserNestedInput
    UserDocument?: UserDocumentUncheckedUpdateManyWithoutUserNestedInput
    UserCard?: UserCardUncheckedUpdateManyWithoutUserNestedInput
    SavedPlace?: SavedPlaceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutUserDocumentInput = {
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Passport?: PassportCreateNestedOneWithoutUserInput
    ARC?: ARCCreateNestedOneWithoutUserInput
    UserCard?: UserCardCreateNestedManyWithoutUserInput
    SavedPlace?: SavedPlaceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserDocumentInput = {
    id?: number
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Passport?: PassportUncheckedCreateNestedOneWithoutUserInput
    ARC?: ARCUncheckedCreateNestedOneWithoutUserInput
    UserCard?: UserCardUncheckedCreateNestedManyWithoutUserInput
    SavedPlace?: SavedPlaceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserDocumentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserDocumentInput, UserUncheckedCreateWithoutUserDocumentInput>
  }

  export type UserUpsertWithoutUserDocumentInput = {
    update: XOR<UserUpdateWithoutUserDocumentInput, UserUncheckedUpdateWithoutUserDocumentInput>
    create: XOR<UserCreateWithoutUserDocumentInput, UserUncheckedCreateWithoutUserDocumentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserDocumentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserDocumentInput, UserUncheckedUpdateWithoutUserDocumentInput>
  }

  export type UserUpdateWithoutUserDocumentInput = {
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Passport?: PassportUpdateOneWithoutUserNestedInput
    ARC?: ARCUpdateOneWithoutUserNestedInput
    UserCard?: UserCardUpdateManyWithoutUserNestedInput
    SavedPlace?: SavedPlaceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserDocumentInput = {
    id?: IntFieldUpdateOperationsInput | number
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Passport?: PassportUncheckedUpdateOneWithoutUserNestedInput
    ARC?: ARCUncheckedUpdateOneWithoutUserNestedInput
    UserCard?: UserCardUncheckedUpdateManyWithoutUserNestedInput
    SavedPlace?: SavedPlaceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutUserCardInput = {
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Passport?: PassportCreateNestedOneWithoutUserInput
    ARC?: ARCCreateNestedOneWithoutUserInput
    UserDocument?: UserDocumentCreateNestedManyWithoutUserInput
    SavedPlace?: SavedPlaceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserCardInput = {
    id?: number
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Passport?: PassportUncheckedCreateNestedOneWithoutUserInput
    ARC?: ARCUncheckedCreateNestedOneWithoutUserInput
    UserDocument?: UserDocumentUncheckedCreateNestedManyWithoutUserInput
    SavedPlace?: SavedPlaceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserCardInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserCardInput, UserUncheckedCreateWithoutUserCardInput>
  }

  export type UserUpsertWithoutUserCardInput = {
    update: XOR<UserUpdateWithoutUserCardInput, UserUncheckedUpdateWithoutUserCardInput>
    create: XOR<UserCreateWithoutUserCardInput, UserUncheckedCreateWithoutUserCardInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserCardInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserCardInput, UserUncheckedUpdateWithoutUserCardInput>
  }

  export type UserUpdateWithoutUserCardInput = {
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Passport?: PassportUpdateOneWithoutUserNestedInput
    ARC?: ARCUpdateOneWithoutUserNestedInput
    UserDocument?: UserDocumentUpdateManyWithoutUserNestedInput
    SavedPlace?: SavedPlaceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserCardInput = {
    id?: IntFieldUpdateOperationsInput | number
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Passport?: PassportUncheckedUpdateOneWithoutUserNestedInput
    ARC?: ARCUncheckedUpdateOneWithoutUserNestedInput
    UserDocument?: UserDocumentUncheckedUpdateManyWithoutUserNestedInput
    SavedPlace?: SavedPlaceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSavedPlaceInput = {
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Passport?: PassportCreateNestedOneWithoutUserInput
    ARC?: ARCCreateNestedOneWithoutUserInput
    UserDocument?: UserDocumentCreateNestedManyWithoutUserInput
    UserCard?: UserCardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSavedPlaceInput = {
    id?: number
    nickname: string
    nationality: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Passport?: PassportUncheckedCreateNestedOneWithoutUserInput
    ARC?: ARCUncheckedCreateNestedOneWithoutUserInput
    UserDocument?: UserDocumentUncheckedCreateNestedManyWithoutUserInput
    UserCard?: UserCardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSavedPlaceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedPlaceInput, UserUncheckedCreateWithoutSavedPlaceInput>
  }

  export type UserUpsertWithoutSavedPlaceInput = {
    update: XOR<UserUpdateWithoutSavedPlaceInput, UserUncheckedUpdateWithoutSavedPlaceInput>
    create: XOR<UserCreateWithoutSavedPlaceInput, UserUncheckedCreateWithoutSavedPlaceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSavedPlaceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSavedPlaceInput, UserUncheckedUpdateWithoutSavedPlaceInput>
  }

  export type UserUpdateWithoutSavedPlaceInput = {
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Passport?: PassportUpdateOneWithoutUserNestedInput
    ARC?: ARCUpdateOneWithoutUserNestedInput
    UserDocument?: UserDocumentUpdateManyWithoutUserNestedInput
    UserCard?: UserCardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedPlaceInput = {
    id?: IntFieldUpdateOperationsInput | number
    nickname?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Passport?: PassportUncheckedUpdateOneWithoutUserNestedInput
    ARC?: ARCUncheckedUpdateOneWithoutUserNestedInput
    UserDocument?: UserDocumentUncheckedUpdateManyWithoutUserNestedInput
    UserCard?: UserCardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type HospitalDeptCreateWithoutHospitalInput = {
    deptName: string
  }

  export type HospitalDeptUncheckedCreateWithoutHospitalInput = {
    id?: number
    deptName: string
  }

  export type HospitalDeptCreateOrConnectWithoutHospitalInput = {
    where: HospitalDeptWhereUniqueInput
    create: XOR<HospitalDeptCreateWithoutHospitalInput, HospitalDeptUncheckedCreateWithoutHospitalInput>
  }

  export type HospitalDeptCreateManyHospitalInputEnvelope = {
    data: HospitalDeptCreateManyHospitalInput | HospitalDeptCreateManyHospitalInput[]
    skipDuplicates?: boolean
  }

  export type HospitalLangCreateWithoutHospitalInput = {
    langName: string
  }

  export type HospitalLangUncheckedCreateWithoutHospitalInput = {
    id?: number
    langName: string
  }

  export type HospitalLangCreateOrConnectWithoutHospitalInput = {
    where: HospitalLangWhereUniqueInput
    create: XOR<HospitalLangCreateWithoutHospitalInput, HospitalLangUncheckedCreateWithoutHospitalInput>
  }

  export type HospitalLangCreateManyHospitalInputEnvelope = {
    data: HospitalLangCreateManyHospitalInput | HospitalLangCreateManyHospitalInput[]
    skipDuplicates?: boolean
  }

  export type HospitalReviewCreateWithoutHospitalInput = {
    aiSummary: string
  }

  export type HospitalReviewUncheckedCreateWithoutHospitalInput = {
    id?: number
    aiSummary: string
  }

  export type HospitalReviewCreateOrConnectWithoutHospitalInput = {
    where: HospitalReviewWhereUniqueInput
    create: XOR<HospitalReviewCreateWithoutHospitalInput, HospitalReviewUncheckedCreateWithoutHospitalInput>
  }

  export type HospitalDeptUpsertWithWhereUniqueWithoutHospitalInput = {
    where: HospitalDeptWhereUniqueInput
    update: XOR<HospitalDeptUpdateWithoutHospitalInput, HospitalDeptUncheckedUpdateWithoutHospitalInput>
    create: XOR<HospitalDeptCreateWithoutHospitalInput, HospitalDeptUncheckedCreateWithoutHospitalInput>
  }

  export type HospitalDeptUpdateWithWhereUniqueWithoutHospitalInput = {
    where: HospitalDeptWhereUniqueInput
    data: XOR<HospitalDeptUpdateWithoutHospitalInput, HospitalDeptUncheckedUpdateWithoutHospitalInput>
  }

  export type HospitalDeptUpdateManyWithWhereWithoutHospitalInput = {
    where: HospitalDeptScalarWhereInput
    data: XOR<HospitalDeptUpdateManyMutationInput, HospitalDeptUncheckedUpdateManyWithoutHospitalInput>
  }

  export type HospitalDeptScalarWhereInput = {
    AND?: HospitalDeptScalarWhereInput | HospitalDeptScalarWhereInput[]
    OR?: HospitalDeptScalarWhereInput[]
    NOT?: HospitalDeptScalarWhereInput | HospitalDeptScalarWhereInput[]
    id?: IntFilter<"HospitalDept"> | number
    hospitalId?: IntFilter<"HospitalDept"> | number
    deptName?: StringFilter<"HospitalDept"> | string
  }

  export type HospitalLangUpsertWithWhereUniqueWithoutHospitalInput = {
    where: HospitalLangWhereUniqueInput
    update: XOR<HospitalLangUpdateWithoutHospitalInput, HospitalLangUncheckedUpdateWithoutHospitalInput>
    create: XOR<HospitalLangCreateWithoutHospitalInput, HospitalLangUncheckedCreateWithoutHospitalInput>
  }

  export type HospitalLangUpdateWithWhereUniqueWithoutHospitalInput = {
    where: HospitalLangWhereUniqueInput
    data: XOR<HospitalLangUpdateWithoutHospitalInput, HospitalLangUncheckedUpdateWithoutHospitalInput>
  }

  export type HospitalLangUpdateManyWithWhereWithoutHospitalInput = {
    where: HospitalLangScalarWhereInput
    data: XOR<HospitalLangUpdateManyMutationInput, HospitalLangUncheckedUpdateManyWithoutHospitalInput>
  }

  export type HospitalLangScalarWhereInput = {
    AND?: HospitalLangScalarWhereInput | HospitalLangScalarWhereInput[]
    OR?: HospitalLangScalarWhereInput[]
    NOT?: HospitalLangScalarWhereInput | HospitalLangScalarWhereInput[]
    id?: IntFilter<"HospitalLang"> | number
    hospitalId?: IntFilter<"HospitalLang"> | number
    langName?: StringFilter<"HospitalLang"> | string
  }

  export type HospitalReviewUpsertWithoutHospitalInput = {
    update: XOR<HospitalReviewUpdateWithoutHospitalInput, HospitalReviewUncheckedUpdateWithoutHospitalInput>
    create: XOR<HospitalReviewCreateWithoutHospitalInput, HospitalReviewUncheckedCreateWithoutHospitalInput>
    where?: HospitalReviewWhereInput
  }

  export type HospitalReviewUpdateToOneWithWhereWithoutHospitalInput = {
    where?: HospitalReviewWhereInput
    data: XOR<HospitalReviewUpdateWithoutHospitalInput, HospitalReviewUncheckedUpdateWithoutHospitalInput>
  }

  export type HospitalReviewUpdateWithoutHospitalInput = {
    aiSummary?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalReviewUncheckedUpdateWithoutHospitalInput = {
    id?: IntFieldUpdateOperationsInput | number
    aiSummary?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalCreateWithoutHospitalDeptInput = {
    nameKo: string
    imageUrl?: string | null
    address: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    phone?: string | null
    openHours: string
    HospitalLang?: HospitalLangCreateNestedManyWithoutHospitalInput
    HospitalReview?: HospitalReviewCreateNestedOneWithoutHospitalInput
  }

  export type HospitalUncheckedCreateWithoutHospitalDeptInput = {
    id?: number
    nameKo: string
    imageUrl?: string | null
    address: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    phone?: string | null
    openHours: string
    HospitalLang?: HospitalLangUncheckedCreateNestedManyWithoutHospitalInput
    HospitalReview?: HospitalReviewUncheckedCreateNestedOneWithoutHospitalInput
  }

  export type HospitalCreateOrConnectWithoutHospitalDeptInput = {
    where: HospitalWhereUniqueInput
    create: XOR<HospitalCreateWithoutHospitalDeptInput, HospitalUncheckedCreateWithoutHospitalDeptInput>
  }

  export type HospitalUpsertWithoutHospitalDeptInput = {
    update: XOR<HospitalUpdateWithoutHospitalDeptInput, HospitalUncheckedUpdateWithoutHospitalDeptInput>
    create: XOR<HospitalCreateWithoutHospitalDeptInput, HospitalUncheckedCreateWithoutHospitalDeptInput>
    where?: HospitalWhereInput
  }

  export type HospitalUpdateToOneWithWhereWithoutHospitalDeptInput = {
    where?: HospitalWhereInput
    data: XOR<HospitalUpdateWithoutHospitalDeptInput, HospitalUncheckedUpdateWithoutHospitalDeptInput>
  }

  export type HospitalUpdateWithoutHospitalDeptInput = {
    nameKo?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    openHours?: StringFieldUpdateOperationsInput | string
    HospitalLang?: HospitalLangUpdateManyWithoutHospitalNestedInput
    HospitalReview?: HospitalReviewUpdateOneWithoutHospitalNestedInput
  }

  export type HospitalUncheckedUpdateWithoutHospitalDeptInput = {
    id?: IntFieldUpdateOperationsInput | number
    nameKo?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    openHours?: StringFieldUpdateOperationsInput | string
    HospitalLang?: HospitalLangUncheckedUpdateManyWithoutHospitalNestedInput
    HospitalReview?: HospitalReviewUncheckedUpdateOneWithoutHospitalNestedInput
  }

  export type HospitalCreateWithoutHospitalLangInput = {
    nameKo: string
    imageUrl?: string | null
    address: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    phone?: string | null
    openHours: string
    HospitalDept?: HospitalDeptCreateNestedManyWithoutHospitalInput
    HospitalReview?: HospitalReviewCreateNestedOneWithoutHospitalInput
  }

  export type HospitalUncheckedCreateWithoutHospitalLangInput = {
    id?: number
    nameKo: string
    imageUrl?: string | null
    address: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    phone?: string | null
    openHours: string
    HospitalDept?: HospitalDeptUncheckedCreateNestedManyWithoutHospitalInput
    HospitalReview?: HospitalReviewUncheckedCreateNestedOneWithoutHospitalInput
  }

  export type HospitalCreateOrConnectWithoutHospitalLangInput = {
    where: HospitalWhereUniqueInput
    create: XOR<HospitalCreateWithoutHospitalLangInput, HospitalUncheckedCreateWithoutHospitalLangInput>
  }

  export type HospitalUpsertWithoutHospitalLangInput = {
    update: XOR<HospitalUpdateWithoutHospitalLangInput, HospitalUncheckedUpdateWithoutHospitalLangInput>
    create: XOR<HospitalCreateWithoutHospitalLangInput, HospitalUncheckedCreateWithoutHospitalLangInput>
    where?: HospitalWhereInput
  }

  export type HospitalUpdateToOneWithWhereWithoutHospitalLangInput = {
    where?: HospitalWhereInput
    data: XOR<HospitalUpdateWithoutHospitalLangInput, HospitalUncheckedUpdateWithoutHospitalLangInput>
  }

  export type HospitalUpdateWithoutHospitalLangInput = {
    nameKo?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    openHours?: StringFieldUpdateOperationsInput | string
    HospitalDept?: HospitalDeptUpdateManyWithoutHospitalNestedInput
    HospitalReview?: HospitalReviewUpdateOneWithoutHospitalNestedInput
  }

  export type HospitalUncheckedUpdateWithoutHospitalLangInput = {
    id?: IntFieldUpdateOperationsInput | number
    nameKo?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    openHours?: StringFieldUpdateOperationsInput | string
    HospitalDept?: HospitalDeptUncheckedUpdateManyWithoutHospitalNestedInput
    HospitalReview?: HospitalReviewUncheckedUpdateOneWithoutHospitalNestedInput
  }

  export type HospitalCreateWithoutHospitalReviewInput = {
    nameKo: string
    imageUrl?: string | null
    address: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    phone?: string | null
    openHours: string
    HospitalDept?: HospitalDeptCreateNestedManyWithoutHospitalInput
    HospitalLang?: HospitalLangCreateNestedManyWithoutHospitalInput
  }

  export type HospitalUncheckedCreateWithoutHospitalReviewInput = {
    id?: number
    nameKo: string
    imageUrl?: string | null
    address: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    phone?: string | null
    openHours: string
    HospitalDept?: HospitalDeptUncheckedCreateNestedManyWithoutHospitalInput
    HospitalLang?: HospitalLangUncheckedCreateNestedManyWithoutHospitalInput
  }

  export type HospitalCreateOrConnectWithoutHospitalReviewInput = {
    where: HospitalWhereUniqueInput
    create: XOR<HospitalCreateWithoutHospitalReviewInput, HospitalUncheckedCreateWithoutHospitalReviewInput>
  }

  export type HospitalUpsertWithoutHospitalReviewInput = {
    update: XOR<HospitalUpdateWithoutHospitalReviewInput, HospitalUncheckedUpdateWithoutHospitalReviewInput>
    create: XOR<HospitalCreateWithoutHospitalReviewInput, HospitalUncheckedCreateWithoutHospitalReviewInput>
    where?: HospitalWhereInput
  }

  export type HospitalUpdateToOneWithWhereWithoutHospitalReviewInput = {
    where?: HospitalWhereInput
    data: XOR<HospitalUpdateWithoutHospitalReviewInput, HospitalUncheckedUpdateWithoutHospitalReviewInput>
  }

  export type HospitalUpdateWithoutHospitalReviewInput = {
    nameKo?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    openHours?: StringFieldUpdateOperationsInput | string
    HospitalDept?: HospitalDeptUpdateManyWithoutHospitalNestedInput
    HospitalLang?: HospitalLangUpdateManyWithoutHospitalNestedInput
  }

  export type HospitalUncheckedUpdateWithoutHospitalReviewInput = {
    id?: IntFieldUpdateOperationsInput | number
    nameKo?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    openHours?: StringFieldUpdateOperationsInput | string
    HospitalDept?: HospitalDeptUncheckedUpdateManyWithoutHospitalNestedInput
    HospitalLang?: HospitalLangUncheckedUpdateManyWithoutHospitalNestedInput
  }

  export type UserDocumentCreateManyUserInput = {
    id?: number
    docType: $Enums.DocType
    fileUrl: string
    createdAt?: Date | string
  }

  export type UserCardCreateManyUserInput = {
    id?: number
    cardType: $Enums.CardType
    cardNumber: string
    balance?: Decimal | DecimalJsLike | number | string
    isDefault?: boolean
    createdAt?: Date | string
  }

  export type SavedPlaceCreateManyUserInput = {
    id?: number
    placeName: string
    category: $Enums.PlaceCategory
    latitude: string
    longitude: string
    address: string
    openHours: string
    phone: string
  }

  export type UserDocumentUpdateWithoutUserInput = {
    docType?: EnumDocTypeFieldUpdateOperationsInput | $Enums.DocType
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDocumentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    docType?: EnumDocTypeFieldUpdateOperationsInput | $Enums.DocType
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDocumentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    docType?: EnumDocTypeFieldUpdateOperationsInput | $Enums.DocType
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardUpdateWithoutUserInput = {
    cardType?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    cardNumber?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    cardType?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    cardNumber?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCardUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    cardType?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    cardNumber?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedPlaceUpdateWithoutUserInput = {
    placeName?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaceCategoryFieldUpdateOperationsInput | $Enums.PlaceCategory
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    openHours?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type SavedPlaceUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    placeName?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaceCategoryFieldUpdateOperationsInput | $Enums.PlaceCategory
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    openHours?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type SavedPlaceUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    placeName?: StringFieldUpdateOperationsInput | string
    category?: EnumPlaceCategoryFieldUpdateOperationsInput | $Enums.PlaceCategory
    latitude?: StringFieldUpdateOperationsInput | string
    longitude?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    openHours?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalDeptCreateManyHospitalInput = {
    id?: number
    deptName: string
  }

  export type HospitalLangCreateManyHospitalInput = {
    id?: number
    langName: string
  }

  export type HospitalDeptUpdateWithoutHospitalInput = {
    deptName?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalDeptUncheckedUpdateWithoutHospitalInput = {
    id?: IntFieldUpdateOperationsInput | number
    deptName?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalDeptUncheckedUpdateManyWithoutHospitalInput = {
    id?: IntFieldUpdateOperationsInput | number
    deptName?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalLangUpdateWithoutHospitalInput = {
    langName?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalLangUncheckedUpdateWithoutHospitalInput = {
    id?: IntFieldUpdateOperationsInput | number
    langName?: StringFieldUpdateOperationsInput | string
  }

  export type HospitalLangUncheckedUpdateManyWithoutHospitalInput = {
    id?: IntFieldUpdateOperationsInput | number
    langName?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}