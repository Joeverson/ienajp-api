import { testProductionOrder } from './production-order.spec';
import { testPlanningDailyTime } from './planning-daily-time.spec';
import { testPlanningWeekly } from './planning-weekly.spec';
import { testProduct } from './product.spec';
import { testProductionParameter } from './production-parameter.spec';
import { testSector } from './sector.spec';
import { testSectorFailure } from './sector-failure.spec';
import { testUser } from './user.spec';
import { testWorkflow } from './workflow.spec';
import { testWorkshift } from './workshift.spec';
import { testPocket } from './pocket.spec';
import { testCustomer } from './customer.spec';
import { testReportingFailure } from './reporting-failure.spec';
import { testProductionLine } from './production-line.spec';
import { testPocketStartTask } from './pocket-start-task.spec';
import { testProduction } from './production.spec';
import { testProductivityParameter } from './productivity-parameter.spec';
import logger from '../src/utils/logger';


logger.transports.console.silent = true;

describe('Exec Unit tests', () => {
  testPocket();
  testProduct();
  testProductionOrder();
  testProductionParameter();
  testPlanningDailyTime();
  testPlanningWeekly();
  testSector();
  testSectorFailure();
  testUser();
  testWorkflow();
  testWorkshift();
  testCustomer();
  testReportingFailure();
  testProductionLine();
  testPocketStartTask();
  testProduction();
  testProductivityParameter();
});
