import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { BeaconsMemoryPersistence } from 'service-beacons-nodex';
import { BeaconsController } from 'service-beacons-nodex';
import { BeaconsHttpServiceV1 } from 'service-beacons-nodex';
import { BeaconsHttpClientV1 } from '../../src/version1/BeaconsHttpClientV1';
import { BeaconsClientV1Fixture } from './BeaconsClientV1Fixture';

suite('BeaconsHttpClientV1', () => {
    let persistence: BeaconsMemoryPersistence;
    let controller: BeaconsController;
    let service: BeaconsHttpServiceV1;
    let client: BeaconsHttpClientV1;
    let fixture: BeaconsClientV1Fixture;

    setup(async () => {
        persistence = new BeaconsMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new BeaconsController();
        controller.configure(new ConfigParams());

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        service = new BeaconsHttpServiceV1();
        service.configure(httpConfig);

        client = new BeaconsHttpClientV1();
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('beacons', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('beacons', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('beacons', 'service', 'http', 'default', '1.0'), service,
            new Descriptor('beacons', 'client', 'http', 'default', '1.0'), client
        );
        controller.setReferences(references);
        service.setReferences(references);
        client.setReferences(references);

        fixture = new BeaconsClientV1Fixture(client);

        await persistence.open(null);
        await service.open(null);
        await client.open(null);
    });

    teardown(async () => {
        await client.close(null);
        await service.close(null);
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Calculate Position', async () => {
        await fixture.testCalculatePosition();
    });

});