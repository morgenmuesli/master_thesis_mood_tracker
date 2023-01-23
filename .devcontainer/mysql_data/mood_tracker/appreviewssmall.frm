TYPE=VIEW
query=select `a`.`appId` AS `appId`,`a`.`title` AS `title`,`R`.`content` AS `content`,`R`.`score` AS `score`,`R`.`at` AS `at` from (`mood_tracker`.`application` `a` join `mood_tracker`.`reviews` `R` on(`a`.`id` = `R`.`appId`)) where `a`.`used` = 1
md5=db5f98de7f60476a255f0066f72aa014
updatable=1
algorithm=0
definer_user=root
definer_host=%
suid=2
with_check_option=0
timestamp=0001670491756988577
create-version=2
source=SELECT a.appId, a.title, R.content, R.score, R.at\n    FROM application as a JOIN Reviews R on a.id = R.appId\n    WHERE a.used = 1
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_general_ci
view_body_utf8=select `a`.`appId` AS `appId`,`a`.`title` AS `title`,`R`.`content` AS `content`,`R`.`score` AS `score`,`R`.`at` AS `at` from (`mood_tracker`.`application` `a` join `mood_tracker`.`reviews` `R` on(`a`.`id` = `R`.`appId`)) where `a`.`used` = 1
mariadb-version=101002
