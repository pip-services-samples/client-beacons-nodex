
import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { BeaconsMemoryPersistence } from 'service-beacons-nodex';
import { BeaconsController } from 'service-beacons-nodex';
import { BeaconsDirectClientV1 } from '../../src/version1/BeaconsDirectClientV1';
import { BeaconsClientV1Fixture } from './BeaconsClientV1Fixture';

suite('BeaconsDirectClientV1', () => {
    let persistence: BeaconsMemoryPersistence;
    let controller: BeaconsController;
    let client: BeaconsDirectClientV1;
    let fixture: BeaconsClientV1Fixture;

    setup(async () => {
        persistence = new BeaconsMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new BeaconsController();
        controller.configure(new ConfigParams());

        client = new BeaconsDirectClientV1();

        let references = References.fromTuples(
            new Descriptor('beacons', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('beacons', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('beacons', 'client', 'direct', 'default', '1.0'), client
        );

        controller.setReferences(references);
        client.setReferences(references);

        fixture = new BeaconsClientV1Fixture(client);

        await persistence.open(null);
    });

    teardown(async () => {
        await persistence.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Calculate Positions', async () => {
        await fixture.testCalculatePosition();
    });
});