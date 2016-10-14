## Database setup

Create the required keyspace and tables:

```cql
CREATE KEYSPACE clickathon
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };

CREATE TABLE clickathon.points (
  username text,
  event_time timestamp,
  points tinyint,
  PRIMARY KEY (username,event_time)
);
```