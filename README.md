## Check the cluster status

Before setting up the database check the cluster status with the command:

```sh
nodetool status
```

## Database setup

Create the required keyspace and tables:

```cql
CREATE KEYSPACE clickathon
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };

CREATE TABLE clickathon.points (
  username text,
  event_time timestamp,
  points int,
  PRIMARY KEY (username,event_time)
);
```