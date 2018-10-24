// moment
import moment from 'moment';
import utils from '../src/utils/utils';

// User
import userFacade from '../src/modules/user/Facade';
import User from '../src/modules/user/User';

// Sector
import sectorFacade from '../src/modules/sector/Facade';
import Sector from '../src/modules/sector/Sector';

// Product
import productFacade from '../src/modules/product/Facade';
import Product from '../src/modules/product/Product';

// Workflow
import workflowFacade from '../src/modules/workflow/Facade';
import Workflow from '../src/modules/workflow/Workflow';

// Workshifts
import workshiftFacade from '../src/modules/workshift/Facade';
import Workshifts from '../src/modules/workshift/Workshifts';

// SectorFailure
import sectorFailureFacade from '../src/modules/sectorFailure/Facade';
import SectorFailure from '../src/modules/sectorFailure/SectorFailure';

// ProductionParameter
import productionParameterFacade from '../src/modules/productionParameter/Facade';
import ProductionParameter from '../src/modules/productionParameter/ProductionParameter';

// ProductionOrder
import productionOrderFacade from '../src/modules/productionOrder/Facade';
import ProductionOrder from '../src/modules/productionOrder/ProductionOrder';
import ProductionOrderProduct from '../src/modules/productionOrder/ProductionOrderProduct';

// Customer
import CustomerFacade from '../src/modules/customer/Facade';
import Customer from '../src/modules/customer/Customer';

// Proceedings
import ProceedingFacade from '../src/modules/proceeding/Facade';
import Proceeding from '../src/modules/proceeding/Proceeding';

// Production Line
import ProductionLine from '../src/modules/productionLines/ProductionLines';
import ProductionLineFacade from '../src/modules/productionLines/Facade';

// PlanningDailyTime
import PlanningWeeklyFacade from '../src/modules/planningWeekly/Facade';
import PlanningWeekly from '../src/modules/planningWeekly/PlanningWeekly';

// Constants
import Schema from '../src/db/schema';
import { PRODUCTION_LINES_STATUS, ACCESS_PROFILE, PRODUCTION_ORDER_STATUS } from '../src/utils/constants';

// RecordUsersSectors
import RecordUsersSectors from '../src/modules/pocket/RecordUsersSectors';
import RecordUsersSectorsFacade from '../src/modules/pocket/Facade';

// PlanningDailyTime
import PlanningDailyTime from '../src/modules/planningDailyTime/PlanningDailyTime';
import FacadePlanningDailyTime from '../src/modules/planningDailyTime/Facade';
import DAOPlanningDailyTime from '../src/modules/planningDailyTime/DAO';

// PlanningWeeklyOrderService
import PlanningWeeklyOrderService from '../src/modules/planningWeeklyOrderService/PlanningWeeklyOrderService';
import FacadePlanningWeeklyOrderService from '../src/modules/planningWeeklyOrderService/Facade';

import ProductivityParameter from '../src/modules/productivityParameter/ProductivityParameter';
import ProductivityParameterFacade from '../src/modules/productivityParameter/Facade';


export const createUser = async (
  blocked = false,
  isLeaderProduction = null
) => {
  const increment = await userFacade.count() + 1;
  
  const user = new User();
  user.id_occupation = 1;
  user.name = `Teste Mocha ${increment}`;
  user.email = `${increment}@email.com.br`;
  user.password = '827ccb0eea8a706c4c34a16891f84e7b';
  user.id_user_created = 1;
  user.id_access_profile = isLeaderProduction ? ACCESS_PROFILE.SUPERVISOR : 1;
  user.id_area = 1;
  user.blocked = blocked;
  user.moment_created = new Date();
  user.moment_changed = new Date();
  user.matriculation = parseInt(`12348${increment}`);

  const result = await userFacade.insert(user);
  return result;
};

export const updateUser = async () => {
  const user = await userFacade.getUser(2);
  const increment = await userFacade.count() + 1;

  user[0].id_occupation = 3;
  user[0].name = 'Teste Update';
  user[0].email = 'testeupdate@scm.com';
  user[0].password = '827ccb0eea8a706c4c34a16891f84e7b';
  user[0].id_user_created = 1;
  user[0].id_user_changed = 1;
  user[0].matriculation = parseInt(`9876${increment}`);
  user[0].moment_changed = new Date();
  const result = await userFacade.update(user[0]);
  
  return result;
};

export const createSector = async (active = true) => {
  const increment = await sectorFacade.getCount() + 1;
  const randomName = Math.random().toString(36).substr(2, 5);

  const sector = new Sector();
  sector.description = `Description teste mocha ${increment}`;
  sector.name = `Teste mocha ${increment} ${randomName}`;
  sector.acronym = `T${randomName}`;
  sector.timeout = 15;
  
  const user = await createUser();
  sector.id_user_created = user.id;
  sector.id_user_leader = user.id;

  sector.id_area = 3;
  sector.active = active;

  sector.moment_created = new Date();
  sector.moment_changed = new Date();
  
  const result = await sectorFacade.register(sector);
  return result;
};

export const updateSector = async () => {
  const sectorFind = { id: 1 };
  const sector = await sectorFacade.findById(sectorFind);
  
  sector[0].name = 'Teste Update';
  sector[0].acronym = 'T1';
  sector[0].description = 'Description teste mocha';

  const user = await createUser();
  sector.id_user_created = user.id;
  sector.id_user_leader = user.id;

  sector.moment_created = new Date();
  sector.moment_changed = new Date();

  const result = await sectorFacade.update(sector[0]);
  
  return result;
};

/*
 * Products
 */
export const createProduct = async () => {
  const increment = await productFacade.count() + 1;

  const product = new Product();
  product.name = `Product name ${increment}`;
  product.description = `Product description ${increment}`;
  product.price = 2800.0;
  product.code = utils.generateValueWithZeros(`132${increment}`, 20);

  const user = await createUser();
  product.id_user_created = user.id;
  product.id_user_changed = user.id;

  product.moment_created = new Date();
  product.moment_changed = new Date();

  const result = await productFacade.insert(product);
  return result;
};

export const updateProduct = async (id) => {
  const queryResult = await productFacade.find(id);
  const product = queryResult[0];
  product.name = 'Product name changed';
  product.description = 'Product description changed';
  product.price = 10000.0;

  const user = await createUser();
  product.id_user_created = user.id;
  product.id_user_changed = user.id;

  product.moment_changed = new Date();

  const result = await productFacade.update(product);
  
  return result;
};

export const createWorkflow = async () => {
  const last = await workflowFacade.getLastByArea(1);

  const workflow = new Workflow();
  workflow.id_area = 1;
  workflow.stage = last.stage + 1;
  workflow.id_sector_origin = last.sector;
  workflow.id_sector_destination = await createSector().then(value => value.id);
  
  const user = await createUser();
  workflow.id_user_created = user.id;
  workflow.id_user_changed = user.id;
  
  workflow.moment_created = new Date();
  workflow.moment_changed = new Date();

  const result = await workflowFacade.insert(workflow);
  return result;
};

export const updateWorkflow = async () => {
  const workflow = await workflowFacade.find(3);
  workflow[0].id_sector_destination = 5;
  
  const user = await createUser();
  workflow[0].id_user_created = user.id;
  workflow[0].id_user_changed = user.id;
  
  workflow[0].moment_created = new Date();
  workflow[0].moment_changed = new Date();

  const result = workflowFacade.update(workflow[0]);
  return result;
};

export const createWorkshift = async (begin, end) => {
  const workshift = new Workshifts();
  workshift.name = 'Teste Mocha 2';
  workshift.hour_begin = begin;
  workshift.hour_end = end;

  const result = await workshiftFacade.create(workshift);
  return result;
};

export const updateWorkshift = async (begin, end) => {
  const workshift = await workshiftFacade.findById(2);
  workshift.name = 'Teste Update';
  workshift.hour_begin = begin;
  workshift.hour_end = end;

  const workshiftUpdate = await workshiftFacade.update(workshift);

  return workshiftUpdate;
};

/*
 * Sector Failure
 */
export const createSectorFailure = async (idSector = 0) => {
  const increment = await sectorFailureFacade.countCustom() + 1;

  const sectorFailure = new SectorFailure();
  sectorFailure.id_sector = idSector > 0 ? idSector : await createSector().then(value => value.id);
  sectorFailure.code = increment;
  sectorFailure.name = `Teste mocha ${increment}`;
  sectorFailure.description = `Description teste mocha ${increment}`;
  
  const user = await createUser();
  sectorFailure.id_user_created = user.id;
  sectorFailure.id_user_changed = user.id;

  sectorFailure.moment_created = new Date();
  sectorFailure.moment_changed = new Date();

  const result = await sectorFailureFacade.insert(sectorFailure);
  return result;
};

export const updateSectorFailure = async (id) => {
  const queryResult = await sectorFailureFacade.find(id);
  const sectorFailure = queryResult[0];
  sectorFailure.name = 'Name changed';
  sectorFailure.description = 'Description teste mocha changed';
  sectorFailure.id_sector = await createSector().then(value => value.id);
  
  const user = await createUser();
  sectorFailure.id_user_created = user.id;
  sectorFailure.id_user_changed = user.id;
  
  sectorFailure.moment_changed = new Date();

  const result = await sectorFailureFacade.update(sectorFailure);
  return result;
};

/*
 *  Production Parameter
 */
export const createProductionParameter = async () => {
  const increment = await productionParameterFacade.countProductDetail() + 1;
  const productionParameter = new ProductionParameter();
  productionParameter.id_sector = (await createSector()).id;
  productionParameter.name = `Teste mocha ${increment}`;
  productionParameter.type = 'A';
  productionParameter.average_value = '10.00';
  productionParameter.alert_value = '25.00';
  productionParameter.alarm_value = '30.00';
  
  const user = await createUser();
  productionParameter.id_user_created = user.id;
  
  productionParameter.moment_created = new Date();
  productionParameter.id_user_changed = user.id;
  productionParameter.moment_changed = new Date();

  const result = await productionParameterFacade.insert(productionParameter);

  return result;
};

export const updateProductionParameter = async () => {
  const productionParameter = await createProductionParameter();
  productionParameter.id_sector = (await createSector()).id;
  productionParameter.name = 'Teste mocha updated';
  productionParameter.type = 'A';
  productionParameter.average_value = 30.00;
  productionParameter.alert_value = 45.00;
  productionParameter.alarm_value = 60.00;
  
  const user = await createUser();
  productionParameter.id_user_created = user.id;
  productionParameter.id_user_changed = user.id;
  
  productionParameter.moment_changed = new Date();

  const result = await productionParameterFacade.update(productionParameter);
  return result;
};

/*
 * Production Order
 */
export const createProductionOrder = async (status = null) => {
  const increment = await productionOrderFacade.getCount() + 1;
  const code = Math.floor(Math.random() * 100000);
  // ProductionOrder
  const order = new ProductionOrder();
  order.id = increment;
  order.id_customer = 6;
  order.id_order_service_status = status !== null ? status : PRODUCTION_ORDER_STATUS.ABERTO;
  order.code = utils.generateValueWithZeros(code, 15);
  const dataAtual = new Date();
  dataAtual.setDate(dataAtual.getDate() + 2);
  order.date_estimated = dataAtual;

  const user = await createUser();
  order.id_user_created = user.id;
  order.id_user_changed = user.id;

  order.moment_created = new Date();
  order.moment_changed = new Date();

  // ProductionOrderProduct
  const productionOrderProduct = new ProductionOrderProduct();
  productionOrderProduct.id_product = await createProduct().then(value => value.id);
  productionOrderProduct.amount = 5;
  productionOrderProduct.id_area = 1;
  
  const result = await productionOrderFacade.register(order, productionOrderProduct);
  
  return result;
};

export const updateProductionOrder = async (id) => {
  // ProductionOrder
  const queryOS = await productionOrderFacade.findById(id);
  const order = new ProductionOrder();
  order.id = queryOS[0].id;
  order.id_customer = queryOS[0].id_customer;
  order.id_order_service_status = queryOS[0].id_order_service_status;
  order.code = Math.floor(Math.random() * 100000000);
  order.date_estimated = queryOS[0].date_estimated;

  const user = await createUser();
  order.id_user_created = queryOS[0].id_user_created;
  order.id_user_changed = user.id;
  order.moment_changed = new Date();

  // ProductionOrderProduct
  const productionOrderProduct = new ProductionOrderProduct();
  const queryOSP = await productionOrderFacade.getProductsByIdProductionOrder(id);
  
  productionOrderProduct.id = queryOSP[0].id;
  productionOrderProduct.id_order_service = queryOSP[0].id_order_service;
  productionOrderProduct.id_product = 4;
  productionOrderProduct.amount = 10000;
  productionOrderProduct.id_area = queryOSP[0].id_area;

  const result = await productionOrderFacade.update(order, productionOrderProduct);

  return result;
};

export const createCustomer = async () => {
  const increment = await CustomerFacade.count() + 1;

  const customer = new Customer();
  customer.company_name = `Company name ${increment}`;
  customer.trading_name = `Customer trading name ${increment}`;
  
  customer.cnpj = utils.generateValueWithZeros(increment, 14);
  customer.phone = '83999999999';

  const user = await createUser();
  customer.id_user_created = user.id;
  
  customer.moment_created = new Date();

  const result = await CustomerFacade.insert(customer);

  return result;
};

export const updateCustomer = async (id) => {
  const queryResult = await CustomerFacade.find(id);
  const customer = queryResult;
  customer.company_name = 'Company Changed name';
  customer.trading_name = 'Customer Changed trading name';
  customer.cnpj = '12300000000191';
  customer.phone = '99999999999';

  const user = await createUser();
  customer.id_user_changed = user.id;

  customer.moment_changed = new Date();

  const result = await CustomerFacade.update(customer);
  
  return result;
};

/**
 * Production Line
 */
export const createProductionLine = async (
  idProductionOrderProduct = null,
  sequential = null,
  status = PRODUCTION_LINES_STATUS.PRODUZINDO
) => {
  const productionLine = new ProductionLine();

  if (idProductionOrderProduct !== null) {
    productionLine.id_order_service_product = idProductionOrderProduct;
  } else {
    // ProductionOrderProduct
    const productionOrder = await createProductionOrder();
    productionLine.id_order_service_product = productionOrder.orders_service_products[0].id;
  }

  productionLine.moment_started = new Date();
  productionLine.moment_ended = new Date();
  productionLine.id_production_line_status = status;

  const codeSqe = sequential !== null ? sequential : `${Math.floor(Math.random() * 100000000)}`;
  productionLine.sequential = utils.generateValueWithZeros(codeSqe, 20);
  const result = await ProductionLineFacade.insert(productionLine);
  return result;
};


/**
 * Proceeding
 */
export const createProceding = async (
  idUser = null,
  sectorDestination = null,
  idSectorFailure = null,
  idProductionLine = null,
  sequential = null
) => {
  const proceeding = new Proceeding();
  let productionLine = null;

  if (!idProductionLine) {
    productionLine = await createProductionLine(null, sequential);
  }

  const sectorFailure = await createSectorFailure();
  const user = await createUser();

  proceeding.id_production_line = idProductionLine || productionLine.id;
  proceeding.moment_started = new Date();
  proceeding.moment_ended = new Date();
  proceeding.id_sector_origin = sectorFailure.id_sector;
  proceeding.id_sector_destination = sectorDestination || sectorFailure.id_sector;
  proceeding.id_user = idUser || user.id;
  proceeding.id_sector_failure = idSectorFailure || sectorFailure.id;
  proceeding.stage = 0;
  proceeding.type = 'D';

  const result = await ProceedingFacade.insert(proceeding);

  return result;
};

/*
 * PlanningWeekly
 */
export const createPlanningWeekly = async (date) => {
  const planning = new PlanningWeekly();

  const start = moment(date).format('YYYY-MM-DD');
  const end = moment(start).add(6, 'days').format('YYYY-MM-DD');
  planning.date_week_start = start;
  planning.date_week_end = end;

  const user = await createUser();
  planning.id_user_created = user.id;

  planning.moment_created = new Date();

  const result = await PlanningWeeklyFacade.insert(planning);
  return result;
};

/**
 * Cria uma OP sem a relação com produtos (OSP)
 * @param {*} status 
 */
export const createProductionOrderWithoutOSP = async (idUser) => {
  const increment = await productionOrderFacade.getCount() + 1;
  // ProductionOrder
  const order = new ProductionOrder();
  order.id = increment;
  order.id_customer = 6;
  order.id_order_service_status = 1;
  order.code = Math.floor(Math.random() * 100000000);
  order.date_estimated = '2018-07-30 00:00:00';
  order.id_user_created = idUser;
  order.moment_created = new Date();
  
  const result = await new Schema('orders_service').insert(order);
  return result;
};

 /*
 * RecordUsersSectors
 */
export const createCheckin = async () => {
  const recordUsersSectors = new RecordUsersSectors();

  const user = await createUser();

  recordUsersSectors.id_sector = await createSector().then(value => value.id);
  recordUsersSectors.id_user = user.id;
  recordUsersSectors.moment_in = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

  const result = await RecordUsersSectorsFacade.checkin(recordUsersSectors, user.matriculation);

  return result.data;
};

 /*
 * RecordUsersSectors
 */
export const createPlanningDailyTime = async (idProductionOrder, idUser) => {
  const planningDailyTime = new PlanningDailyTime();

  planningDailyTime.id_order_service = idProductionOrder;
  planningDailyTime.id_planning_weekly = 1;
  planningDailyTime.date = moment().format('YYYY-MM-DD');
  planningDailyTime.time_begin = '14:00:00';
  planningDailyTime.time_end = '15:00:00';
  planningDailyTime.amount = 2;
  planningDailyTime.id_user_created = idUser;
  planningDailyTime.moment_created = new Date();

  const result = await FacadePlanningDailyTime.insert(planningDailyTime);

  return result.data;
};

/**
 * Planning Weekly Order Service
 */
export const createPlanningWeeklyOrderService = async (order, pWeekly, user) => {
  const increment = await FacadePlanningWeeklyOrderService.count() + 1;
  
  const pwos = new PlanningWeeklyOrderService();
  pwos.id = increment;
  pwos.id_user_created = user.id;
  pwos.id_user_changed = user.id;
  pwos.moment_created = new Date();
  pwos.moment_changed = new Date();
  pwos.id_planning_weekly = pWeekly.id;
  pwos.id_order_service = [order.id];

  const res = await FacadePlanningWeeklyOrderService.insertOpInPw(pwos);
  return res;
};

/**
 * Create Planning Daily Time yesterday
 */
export const createPlanningDailyTimeYesterday = async (idProductionOrder) => {
  const planningDailyTime = new PlanningDailyTime();

  planningDailyTime.id_order_service = idProductionOrder;
  planningDailyTime.id_planning_weekly = 1;
  planningDailyTime.date = moment().subtract(1, 'days').format('YYYY-MM-DD');
  planningDailyTime.time_begin = '14:00:00';
  planningDailyTime.time_end = '15:00:00';
  planningDailyTime.amount = 1;
  planningDailyTime.id_user_created = 1;
  planningDailyTime.moment_created = new Date();

  const result = await (new DAOPlanningDailyTime()).insert(planningDailyTime);
  
  return result;
};

export const createProductivityParameter = async (active = true) => {
  const increment = await ProductivityParameterFacade.count() + 1;

  const productivity = new ProductivityParameter();
  productivity.id = increment;
  productivity.capacity_hourly = 500;

  const product = await createProduct().then(value => value.id);
  productivity.id_product = product;

  const user = await createUser();
  productivity.id_user_created = user.id;
  productivity.id_user_changed = user.id;
  
  const workshift = await createWorkshift('01:00:00', '02:00:00');
  productivity.id_workshift = workshift.id;

  productivity.moment_created = new Date();
  productivity.moment_changed = new Date();
  
  const result = await ProductivityParameterFacade.insert(productivity);
  return result;
};

export const updateProductivityParameter = async () => {
  const productivityId = { id: 1 };
  const productivity = await ProductivityParameterFacade.find(productivityId.id);
  
  const product = await createProduct().then(value => value.id);
  productivity.id_product = product;
  productivity.id_workshift = 2;
  
  const user = await createUser();
  productivity.id_user_changed = user.id;
  
  productivity.moment_changed = new Date();

  const result = await ProductivityParameterFacade.update(productivity[0]);
  
  return result;
};
