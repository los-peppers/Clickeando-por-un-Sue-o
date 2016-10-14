## Database setup

Create the required keyspace and tables:

```cql
CREATE KEYSPACE clickathon
  WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };

CREATE TABLE clickathon.users (
  id UUID PRIMARY KEY,
  name text
);

CREATE TABLE clickathon.points (
  user_id UUID,
  event_time timestamp,
  points tinyint,
  PRIMARY KEY (user_id,event_time)
);
```