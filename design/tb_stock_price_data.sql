delete from tb_stock_price;

INSERT INTO `smcdb`.`tb_stock_price`(`id`,`price`,`date`,`remarks`,`company_exchange_id`) VALUES (uuid(), 87.00, '2020-05-01 09:10:00', 'open price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`id`,`price`,`date`,`remarks`,`company_exchange_id`) VALUES (uuid(), 88.50, '2020-05-01 15:30:00', 'close price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`id`,`price`,`date`,`remarks`,`company_exchange_id`) VALUES (uuid(), 87.22, '2020-05-02 09:10:00', 'open price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`id`,`price`,`date`,`remarks`,`company_exchange_id`) VALUES (uuid(), 89.22, '2020-05-02 15:30:00', 'close price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`id`,`price`,`date`,`remarks`,`company_exchange_id`) VALUES (uuid(), 90.38, '2020-05-03 09:10:00', 'open price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`id`,`price`,`date`,`remarks`,`company_exchange_id`) VALUES (uuid(), 90.11, '2020-05-03 15:30:00', 'close price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`id`,`price`,`date`,`remarks`,`company_exchange_id`) VALUES (uuid(), 93.77, '2020-05-04 09:10:00', 'open price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`id`,`price`,`date`,`remarks`,`company_exchange_id`) VALUES (uuid(), 95.34, '2020-05-04 15:30:00', 'close price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`id`,`price`,`date`,`remarks`,`company_exchange_id`) VALUES (uuid(), 92.10, '2020-05-05 09:10:00', 'open price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`id`,`price`,`date`,`remarks`,`company_exchange_id`) VALUES (uuid(), 93.77, '2020-05-05 15:30:00', 'close price', 'e632bf82-a322-4978-85dc-7581e282fee4');

select sp.date, sp.price, ce.comp_id, c.name FROM smcdb.tb_stock_price sp 
left join smcdb.tb_company_exchange ce on sp.company_exchange_id=ce.id 
inner join smcdb.tb_company c on c.id=ce.comp_id 
where sp.date>='2020-05-01' and sp.date<'2020-05-31' 
and ce.comp_id in('aaefc180-2354-4822-b2fd-450a7f08da08');