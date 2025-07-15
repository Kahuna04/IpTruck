"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShipperDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_shipper_dto_1 = require("./create-shipper.dto");
class UpdateShipperDto extends (0, mapped_types_1.PartialType)(create_shipper_dto_1.CreateShipperDto) {
}
exports.UpdateShipperDto = UpdateShipperDto;
//# sourceMappingURL=update-shipper.dto.js.map