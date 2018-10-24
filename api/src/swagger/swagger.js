import pjson from '../../package.json';
import * as WorkshiftSwagger from '../../src/modules/workshift/swagger';
import * as WorkflowtSwagger from '../../src/modules/workflow/swagger';
import * as UserSwagger from '../../src/modules/user/swagger';
import * as AccessProfilesSwagger from '../../src/modules/accessProfiles/swagger';
import * as AreaSwagger from '../../src/modules/area/swagger';
import * as CustomerSwagger from '../../src/modules/customer/swagger';
import * as LoginSwagger from '../../src/modules/login/swagger';
import * as GeneralSwagger from '../../src/modules/general/swagger';
import * as OccupationSwagger from '../../src/modules/occupation/swagger';
import * as PanelSwagger from '../../src/modules/panel/swagger';
import * as PlanningDailyTimeSwagger from '../../src/modules/planningDailyTime/swagger';
import * as PlanningWeeklySwagger from '../../src/modules/planningWeekly/swagger';
import * as PocketSwagger from '../../src/modules/pocket/swagger';
import * as ProductSwagger from '../../src/modules/product/swagger';
import * as ReportingFailureSwagger from '../../src/modules/reportingFailures/swagger';
import * as SectorFailureSwagger from '../../src/modules/sectorFailure/swagger';
import * as ProductionSwagger from '../../src/modules/production/swagger';
import * as SectorSwagger from '../../src/modules/sector/swagger';
import * as ProductionLinesSwagger from '../../src/modules/productionLines/swagger';
import * as ProductionOrderSwagger from '../../src/modules/productionOrder/swagger';
import * as ProductivityParameterSwagger from '../../src/modules/productivityParameter/swagger';

module.exports = {
  swagger: '2.0',
  info: {
    description: 'Descrição',
    version: pjson.version,
    title: 'API - SCM Corning'
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  basePath: '/api/v1',
  tags: [
    AccessProfilesSwagger.tag,
    AreaSwagger.tag,
    CustomerSwagger.tag,
    GeneralSwagger.tag,
    LoginSwagger.tag,
    OccupationSwagger.tag,
    PanelSwagger.tag,
    PlanningDailyTimeSwagger.tag,
    PlanningWeeklySwagger.tag,
    PocketSwagger.tag,
    ProductSwagger.tag,
    ProductionSwagger.tag,
    ProductionLinesSwagger.tag,
    ProductionOrderSwagger.tag,
    ProductivityParameterSwagger.tag,
    ReportingFailureSwagger.tag,
    SectorSwagger.tag,
    SectorFailureSwagger.tag,
    UserSwagger.tagUser,
    WorkflowtSwagger.tagWorkflow,
    WorkshiftSwagger.tagWorkshift
  ],
  schemes: [
    'http'
  ],
  paths: {
    '/access-profiles': AccessProfilesSwagger.routeRoot,
    '/area': AreaSwagger.routeRoot,
    '/customer': CustomerSwagger.routeRoot,
    '/customer/{id}': CustomerSwagger.routeByID,
    '/general/wipedb': GeneralSwagger.routeWipeDb,
    '/general/wipedb-full': GeneralSwagger.routeWipeDbFull,
    '/login': LoginSwagger.routeRoot,
    '/occupation': OccupationSwagger.routeRoot,
    '/panel/global': PanelSwagger.routeGlobal,
    '/panel/sectors': PanelSwagger.routeSectors,
    '/planning-daily-time': PlanningDailyTimeSwagger.routeRoot,
    '/planning-daily-time/{id}': PlanningDailyTimeSwagger.routeByID,
    '/planning-daily-time/orders': PlanningDailyTimeSwagger.routeListOrdersAvailable,
    '/planning-weekly': PlanningWeeklySwagger.routeRoot,
    '/planning-weekly/listPlanningIsCurrentDate': PlanningWeeklySwagger.routeListPlanningIsCurrentDate,
    '/planning-weekly/{id}': PlanningWeeklySwagger.routeByID,
    '/planning-weekly/op/:id': PlanningWeeklySwagger.routeOPByID,
    '/pocket': PocketSwagger.routeRoot,
    '/pocket/checkin': PocketSwagger.routeCheckin,
    '/pocket/checkout': PocketSwagger.routeCheckout,
    '/pocket/start-task': PocketSwagger.routeStartTask,
    '/pocket/end-task': PocketSwagger.routeEndTask,
    '/pocket/last-task': PocketSwagger.routeLastTask,
    '/pocket/fix-task': PocketSwagger.routeFixTask,
    '/product': ProductSwagger.routeRoot,
    '/product/defects': ProductSwagger.routeDefects,
    '/product/{id}': ProductSwagger.routeByID,
    '/production/status': ProductionSwagger.routeStatus,
    '/production/realtime': ProductionSwagger.routeRealTime,
    '/production/panel': ProductionSwagger.routeStatusKiosk,
    '/production/progress': ProductionSwagger.routeProgressDay,
    '/production/rework': ProductionSwagger.routeRework,
    '/production-lines': ProductionLinesSwagger.routeRoot,
    '/production-lines/quantity-status': ProductionLinesSwagger.routeQuantityStatus,
    '/production-lines/producing': ProductionLinesSwagger.routeProducing,
    '/production-order': ProductionOrderSwagger.routeRoot,
    '/production-order/producing': ProductionOrderSwagger.routeProducing,
    '/production-order/status': ProductionOrderSwagger.routeProductionOrderStatus,
    '/production-order/production-line/status': ProductionOrderSwagger.routeProductionOrderProducionLineStatus,
    '/production-order/{id}/sectors': ProductionOrderSwagger.routeProductionOrderSectorStatusTotal,
    '/production-order/{id}/sectors/failures': ProductionOrderSwagger.routeProductionOrderSectorFailures,
    '/production-order/{id}/products': ProductionOrderSwagger.routeProductionOrderProducts,
    'production-order/{id}': ProductionOrderSwagger.routeProductionOrderById,
    '/production-order/barcode/{code}': ProductionOrderSwagger.routeProductionOrderByCode,
    '/productivity-parameter': ProductivityParameterSwagger.routeRoot,
    '/productivity-parameter/{id}': ProductivityParameterSwagger.routeByID,
    '/reporting-failures': ReportingFailureSwagger.routeRoot,
    '/sector': SectorSwagger.routeRoot,
    '/sector/{id}': SectorSwagger.routeByID,
    '/sector/{id}/status': SectorSwagger.routeStatusById,
    '/sector/{id}/errors': SectorSwagger.routeErrorsById,
    '/sector/{id}/orders': SectorSwagger.routeOrdersById,
    '/sector/{id}/variables': SectorSwagger.routeVariablesPerfomaceById,
    '/sector/{id}/failures': SectorSwagger.routeFailureById,
    '/sector/status': SectorSwagger.routeStatus,
    '/sector/reworks': SectorSwagger.routeReworks,
    '/sector-failure': SectorFailureSwagger.routeRoot,
    '/sector-failure/{id}': SectorFailureSwagger.routeByID,
    '/sector-failure/generalStatistics': SectorFailureSwagger.routeGeneralStatistics,
    '/sector-failure/sectors': SectorFailureSwagger.routeSectorsHasFailures,
    '/sector-failure/sector/{id}': SectorFailureSwagger.routeSectorById,
    '/user': UserSwagger.routeRootUser,
    '/user/{id}': UserSwagger.routeByIDUser,
    '/workflow': WorkflowtSwagger.routeRootWorkflow,
    '/workflow/{id}': WorkflowtSwagger.routeByIDWorkflow,
    '/workshift': WorkshiftSwagger.routeRootWorkshifts,
    '/workshift/{id}': WorkshiftSwagger.routeByIDWorkshift
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [
    {
      Bearer: []
    }
  ],
  definitions: {
    AccessProfile: AccessProfilesSwagger.AccessProfile,
    Area: AreaSwagger.Area,
    Customer: CustomerSwagger.Customer,
    NewCustomer: CustomerSwagger.NewCustomer,
    CustomerReturned: CustomerSwagger.CustomerReturned,
    Login: LoginSwagger.Login,
    LoginReturned: LoginSwagger.LoginReturned,
    Occupation: OccupationSwagger.Occupation,
    Panel: PanelSwagger.Panel,
    PanelSectors: PanelSwagger.PanelSectors,
    PlanningDailyTime: PlanningDailyTimeSwagger.PlanningDailyTime,
    NewPlanningDailyTime: PlanningDailyTimeSwagger.NewPlanningDailyTime,
    PlanningDailyTimeReturned: PlanningDailyTimeSwagger.PlanningDailyTimeReturned,
    PlanningWeekly: PlanningWeeklySwagger.PlanningWeekly,
    NewPlanningWeekly: PlanningWeeklySwagger.NewPlanningWeekly,
    PlanningWeeklyReturned: PlanningWeeklySwagger.PlanningWeeklyReturned,
    OrderProductionPlanning: PlanningWeeklySwagger.OrderProductionPlanning,
    OrderProductionPlanningWeekly: PlanningWeeklySwagger.OrderProductionPlanningWeekly,
    OrderAvailableInPlanningDaily: PlanningDailyTimeSwagger.OrderAvailableInPlanningDaily,
    Checkin: PocketSwagger.Checkin,
    RecordUsersSectors: PocketSwagger.RecordUsersSectors,
    OrderProductionReturned: PocketSwagger.OrderProductionReturned,
    LastTaskReturned: PocketSwagger.LastTaskReturned,
    FixTaskReturned: PocketSwagger.FixTaskReturned,
    Product: ProductSwagger.Product,
    NewProduct: ProductSwagger.NewProduct,
    ProductReturned: ProductSwagger.ProductReturned,
    ProductsDefects: ProductSwagger.ProductsDefects,
    ProductionByStatus: ProductionSwagger.ProductionByStatus,
    ProductionInRealTime: ProductionSwagger.ProductionInRealTime,
    ProductionStatusKiosk: ProductionSwagger.ProductionStatusKiosk,
    ProductionProgressDay: ProductionSwagger.ProductionProgressDay,
    ProductionRework: ProductionSwagger.ProductionRework,
    ProductionLines: ProductionLinesSwagger.ProductionLines,
    ProductionLinesQuantityStatus: ProductionLinesSwagger.ProductionLinesQuantityStatus,
    ProductionLinesProducing: ProductionLinesSwagger.ProductionLinesProducing,
    ProductionOrder: ProductionOrderSwagger.ProductionOrder,
    NewProductionOrder: ProductionOrderSwagger.NewProductionOrder,
    ProductionOrderReturned: ProductionOrderSwagger.ProductionOrderReturned,
    ProductionOrderProducing: ProductionOrderSwagger.ProductionOrderProducing,
    ProductionOrderStatus: ProductionOrderSwagger.ProductionOrderStatus,
    ProductionOrderProducionLineStatus: ProductionOrderSwagger.ProductionOrderProducionLineStatus,
    ProductionOrderSectorStatusTotal: ProductionOrderSwagger.ProductionOrderSectorStatusTotal,
    ProductionOrderSectorFailures: ProductionOrderSwagger.ProductionOrderSectorFailures,
    ProductionOrderProducts: ProductionOrderSwagger.ProductionOrderProducts,
    ProductionOrderByID: ProductionOrderSwagger.ProductionOrderByID,
    ProductionOrderByCode: ProductionOrderSwagger.ProductionOrderByCode,
    ProductivityParameter: ProductivityParameterSwagger.ProductivityParameter,
    NewProductivityParameter: ProductivityParameterSwagger.NewProductivityParameter,
    ProductivityParameterReturned: ProductivityParameterSwagger.ProductivityParameterReturned,
    NewReportingFailure: ReportingFailureSwagger.NewReportingFailure,
    Sector: SectorSwagger.Sector,
    NewSector: SectorSwagger.NewSector,
    SectorReturned: SectorSwagger.SectorReturned,
    StatusSector: SectorSwagger.StatusSector,
    ReworksSector: SectorSwagger.ReworksSector,
    SectorFailureSector: SectorSwagger.SectorFailureSector,
    StatusByOrderInSector: SectorSwagger.StatusByOrderInSector,
    VariablesPerfomace: SectorSwagger.VariablesPerfomace,
    FailureInSector: SectorSwagger.FailureInSector,
    SectorFailure: SectorFailureSwagger.SectorFailure,
    NewSectorFailure: SectorFailureSwagger.NewSectorFailure,
    SectorFailureReturned: SectorFailureSwagger.SectorFailureReturned,
    SectorHasFailure: SectorFailureSwagger.SectorHasFailure,
    GeneralStatistics: SectorFailureSwagger.GeneralStatistics,
    SectorHasFailureById: SectorFailureSwagger.SectorHasFailureById,
    User: UserSwagger.User,
    NewUser: UserSwagger.NewUser,
    UpdateUser: UserSwagger.UpdateUser,
    Workflow: WorkflowtSwagger.Workflow,
    NewWorkflow: WorkflowtSwagger.NewWorkflow,
    UpdateWorkflow: WorkflowtSwagger.UpdateWorkflow,
    Workshift: WorkshiftSwagger.Workshift,
    NewWorkshift: WorkshiftSwagger.NewWorkshift,
    UpdateWorkshift: WorkshiftSwagger.UpdateWorkshift
  }
};
