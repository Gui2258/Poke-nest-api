import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";
import { LargeNumberLike } from "crypto";


export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Min(1)
    @IsNumber()
    limit? : number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset? : number;
}