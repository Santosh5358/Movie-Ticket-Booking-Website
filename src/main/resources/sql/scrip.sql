
create database courses;

use courses;

CREATE TABLE `registration` ( `id` INT NOT NULL AUTO_INCREMENT,

                       `email` VARCHAR(45) NOT NULL,
                        `name` VARCHAR(255) NOT NULL ,
                        `number` VARCHAR(45) NOT NULL,

                       `password` VARCHAR(45) NOT NULL,

                        `role` VARCHAR(45) NOT NULL,
                       PRIMARY KEY (`id`));

--
-- Insert into `registration` (`email`,`name`,`number`,`password`,`role`)
-- values ('admin@admin.com','admin','0248294822','admin','admin');
-- INSERT IGNORE INTO `registration` VALUES (NULL,'happy','12345','1');
-- INSERT IGNORE INTO `authorities` VALUES (NULL,'happy','write');