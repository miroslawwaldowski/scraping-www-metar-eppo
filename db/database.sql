CREATE DATABASE metar;

CREATE TABLE eppo
(
  id serial PRIMARY KEY,
  time_stamp TIMESTAMPTZ,
  temperature NUMERIC(4,1),
  humidity NUMERIC(4,1),
  pressure NUMERIC(5,0)
);