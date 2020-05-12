

INSERT INTO `smcdb`.`tb_sector`(`id`,`name`) VALUES (uuid(), 'Finance');
INSERT INTO `smcdb`.`tb_sector`(`id`,`name`) VALUES (uuid(), 'Healthcare Services');
INSERT INTO `smcdb`.`tb_sector`(`id`,`name`) VALUES (uuid(), 'Pharmaceuticals');
INSERT INTO `smcdb`.`tb_sector`(`id`,`name`) VALUES (uuid(), 'Hotels');
INSERT INTO `smcdb`.`tb_sector`(`id`,`name`) VALUES (uuid(), 'Internet Software & Services');

SELECT * FROM smcdb.tb_sector;


INSERT INTO `smcdb`.`tb_company_sector`(`tb_company_id`,`tb_sector_id`) VALUES ('9e031a2b-8000-4c3d-9656-cbd431329469', '36221b9f-92a2-11ea-99fc-0242ac110002');
INSERT INTO `smcdb`.`tb_company_sector`(`tb_company_id`,`tb_sector_id`) VALUES ('9e031a2b-8000-4c3d-9656-cbd431329469', '577b0edc-92a2-11ea-99fc-0242ac110002');
INSERT INTO `smcdb`.`tb_company_sector`(`tb_company_id`,`tb_sector_id`) VALUES ('d35af29f-5815-43bf-b801-3419a2167111', '577b0edc-92a2-11ea-99fc-0242ac110002');
INSERT INTO `smcdb`.`tb_company_sector`(`tb_company_id`,`tb_sector_id`) VALUES ('dbcc502f-b54c-4afa-8dcb-942ca07616dc', '577b0edc-92a2-11ea-99fc-0242ac110002');