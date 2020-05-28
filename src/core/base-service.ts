import { Database } from "../common/components/database/database";
import { Service } from "typedi";

@Service()
export class BaseService {

    constructor(
      public database: Database
    ) {}

}
