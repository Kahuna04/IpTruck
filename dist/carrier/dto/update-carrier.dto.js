"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarrierDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_carrier_dto_1 = require("./create-carrier.dto");
class UpdateCarrierDto extends (0, mapped_types_1.PartialType)(create_carrier_dto_1.CreateCarrierDto) {
}
exports.UpdateCarrierDto = UpdateCarrierDto;
//# sourceMappingURL=update-carrier.dto.js.map