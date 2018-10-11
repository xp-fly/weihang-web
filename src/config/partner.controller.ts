import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {PartnerService} from './partner.service';
import {CreatePartnerDto} from './dto/create-partner.dto';

@ApiUseTags('partner')
@UseGuards(AuthGuard('jwt'))
@Controller('partner')
export class PartnerController {
    constructor(
        private readonly partnerService: PartnerService,
    ) {}

    @Get()
    async list(
        @Query() query: any,
    ) {
        const [list, count] = await this.partnerService.list(query);
        return {
            count,
            list,
        };
    }

    @Post()
    async add(
        @Body() body: CreatePartnerDto,
    ) {
        return await this.partnerService.add(body);
    }

    @Put(':id')
    async edit(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: CreatePartnerDto,
    ) {
        return await this.partnerService.edit(id, body);
    }

    @Delete(':id')
    async delete(
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        return await this.partnerService.delete(id);
    }
}
