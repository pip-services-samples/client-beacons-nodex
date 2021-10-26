import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { BeaconV1 } from './BeaconV1';
import { IBeaconsClientV1 } from './IBeaconsClientV1';

export class BeaconsNullClientV1 implements IBeaconsClientV1 {
    public async getBeacons(correlationId: string, filter: FilterParams,
        paging: PagingParams): Promise<DataPage<BeaconV1>> {
        return new DataPage([], 0);
    }

    public async getBeaconById(correlationId: string, beaconId: string): Promise<BeaconV1> {
        return null;
    }

    public async getBeaconByUdi(correlationId: string, udi: string): Promise<any> {
        return null;
    }

    public async calculatePosition(correlationId: string, siteId: string, udis: string[]): Promise<any> {
        return null;
    }

    public async createBeacon(correlationId: string, beacon: BeaconV1): Promise<BeaconV1> {
        return null;
    }

    public async updateBeacon(correlationId: string, beacon: BeaconV1): Promise<BeaconV1> {
        return null;
    }

    public async deleteBeaconById(correlationId: string, beaconId: string): Promise<BeaconV1> {
        return null;
    }

}