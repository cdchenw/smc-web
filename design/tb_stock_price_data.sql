delete from tb_stock_price;

INSERT INTO `smcdb`.`tb_stock_price`(`price`,`date`,`remarks`,`id`) VALUES (87.00, '2020-05-01 09:10:00', 'open price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`price`,`date`,`remarks`,`id`) VALUES (88.50, '2020-05-01 15:30:00', 'close price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`price`,`date`,`remarks`,`id`) VALUES (87.22, '2020-05-02 09:10:00', 'open price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`price`,`date`,`remarks`,`id`) VALUES (89.22, '2020-05-02 15:30:00', 'close price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`price`,`date`,`remarks`,`id`) VALUES (90.38, '2020-05-03 09:10:00', 'open price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`price`,`date`,`remarks`,`id`) VALUES (90.11, '2020-05-03 15:30:00', 'close price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`price`,`date`,`remarks`,`id`) VALUES (93.77, '2020-05-04 09:10:00', 'open price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`price`,`date`,`remarks`,`id`) VALUES (95.34, '2020-05-04 15:30:00', 'close price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`price`,`date`,`remarks`,`id`) VALUES (92.10, '2020-05-05 09:10:00', 'open price', 'e632bf82-a322-4978-85dc-7581e282fee4');
INSERT INTO `smcdb`.`tb_stock_price`(`price`,`date`,`remarks`,`id`) VALUES (93.77, '2020-05-05 15:30:00', 'close price', 'e632bf82-a322-4978-85dc-7581e282fee4');

select sp.date, sp.price, ce.comp_id, c.name FROM smcdb.tb_stock_price sp 
left join smcdb.tb_company_exchange ce on sp.company_exchange_id=ce.id 
inner join smcdb.tb_company c on c.id=ce.comp_id 
where sp.date>='2020-05-01' and sp.date<'2020-05-31' 
and ce.comp_id ='aaefc180-2354-4822-b2fd-450a7f08da08'
and ce.exchange_id='173df4e9-77ad-44e4-b014-5fd5a3a1d38b';


select sp.date as transDate, sp.price, c.name as remarks FROM smcdb.tb_stock_price sp 
left join smcdb.tb_company_exchange ce on sp.company_exchange_id=ce.id 
inner join smcdb.tb_company c on c.id=ce.comp_id 
where sp.date>='2020-05-01' and sp.date<'2020-05-31' 
and ce.comp_id ='aaefc180-2354-4822-b2fd-450a7f08da08'
and ce.exchange_id='173df4e9-77ad-44e4-b014-5fd5a3a1d38b';


select *, 'OCBC' as company from tb_stock_price;

insert into tb_stock_price 
select ce.id, 94.00 as price, '2020-05-12 14:29:35' as date, 'data import' as remarks  from tb_company_exchange ce 
inner join tb_stock_exchange se on ce.exchange_id=se.id where ce.stock_code='TOSYY1' and se.short_name="LSE";


select * from tb_stock_price;

insert into tb_stock_price select * from tb_stock_price where price=87.00


