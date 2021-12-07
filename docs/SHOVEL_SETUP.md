# Apollos Shovel Setup

## Setup database schema

In order for the shovel to work, it has to have a Postgres database with the correct database schema

 1. In the `.env` of your Apollos API, add the Postgres Connection URI of your database as `DATABASE_URL=<Your Postgres Connection URI>` as well as `DATABASE_CONTENT=true`
2. In the API folder, run `yarn migrator up`

You should be able to see that the migrations were applied and that the database schema was updated.

## Create the necessary dags in the Apollos Shovel

 1. In the shovel's dag folder, duplicate the `core-rock-content-item-dag.py`, `core-rock-people-dag.py`, and `core-rock-tags-dag.py` and rename each file to match the name of the church.
 2. Go through each of the newly created files and replace `core` with the church of your choice. Be consistent though, as the shovel uses this name to access the church's variables that will be added in airflow

At this point, the DAGs should be visible from the Airflow console. If not, restart astronomer with `astro dev stop && astro dev start`. If you using a Mac M1 machine, you will need to run `DOCKER_BUILDKIT=0 astro dev start`

## Add the Postgres connection
1. Under the `Admin` tab in Airflow, go to `Connections`
2. Add your database's connection using the naming format as `<church_name>_apollos_postgres`.  Select `Postgres` as the Connection Type. **It is critical to keep the `church_name`  consistent throughout the entire shovel.**

## Add the variables
1. Under the `Admin` tab in Airflow, go to `Variables`
2. Add the following variables
	- `<church_name>_rock_api` - Rock API URL
	- `<church_name>_rock_token` - Rock API Token
	- `<church_name>_rock_config` - This will be an object that contains more variables associated with the rock instance. You can see an example in the `core_rock_config` variable. This is explained more in `CONTENT_SHOVEL_MIGRATIONS.md` **Required Keys:**
	-- `CONTENT_MAPPINGS` - This will be related to how the `config.yml` is setup
	-- `PERSONA_CATEGORY_ID` - The ID of the correct persona category in Rock
	-- `SERIES_CATEGORY_ORIGIN_IDS` - an array of the content item categories that are series
	
## Run the Shovel
Once everything is added correctly, turn on each DAG related to the church and watch the magic happen!