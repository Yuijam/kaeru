CREATE DATABASE IF NOT EXISTS kaerudb;
USE kaerudb;
CREATE TABLE IF NOT EXISTS record (
  id SMALLINT AUTO_INCREMENT,
  line_id SMALLINT,
  status_cd VARCHAR(30),
  message VARCHAR(500),
  created_at DATETIME,
  deleted_at DATETIME,
  PRIMARY KEY (id)
);