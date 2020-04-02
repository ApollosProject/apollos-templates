# Configure the Heroku provider

##
# 1. Variables
##
variable "heroku_email" {
  type        = "string"
  description = "Your Heroku Email"
}

variable "heroku_api_key" {
  type        = "string"
  description = "Your Heroku API key (find it in your Heroku account settings)"
}

variable "heroku_team" {
  type        = "string"
  description = "Name of the Team (must already exist)"
}

variable "app_name" {
  type        = "string"
  description = "Your app's name. Name must start with a letter, end with a letter or digit and can only contain lowercase letters, digits, and dashes."
}

variable "bible_api_key" {
  type        = "string"
  default     = ""
  description = "Optional Bible.API key. Use if you render scripture."
}

variable "engine_api_key" {
  type        = "string"
  default     = ""
  description = "Optional Apollo Engine API Key. Apollo Engine is an APM for GraphQL services."
}

variable "rock_token" {
  type        = "string"
  default     = ""
  description = "Your Rock Token. See apollos-data documentation for required permissions."
}

variable "one_signal_rest_key" {
  type        = "string"
  default     = ""
  description = "Optional OneSignal rest key. Use if you utilize OneSignal for sending push notifications."
}

provider "heroku" {
  email   = "${var.heroku_email}"
  api_key = "${var.heroku_api_key}"
}

##
# 2. Create Heroku apps for staging and production
##
resource "heroku_app" "staging" {
  region = "us"
  name   = "${var.app_name}-staging"

  config_vars {
    BIBLE_API_KEY       = "${var.bible_api_key}"
    ENGINE_API_KEY      = "${var.engine_api_key}"
    ROCK_TOKEN          = "${var.rock_token}"
    ONE_SIGNAL_REST_KEY = "${var.one_signal_rest_key}"
  }

  organization = {
    name = "${var.heroku_team}"
  }

  stack = "container"
}

resource "heroku_app" "production" {
  region = "us"
  name   = "${var.app_name}-production"

  config_vars {
    BIBLE_API_KEY       = "${var.bible_api_key}"
    ENGINE_API_KEY      = "${var.engine_api_key}"
    ROCK_TOKEN          = "${var.rock_token}"
    ONE_SIGNAL_REST_KEY = "${var.one_signal_rest_key}"
  }

  organization = {
    name = "${var.heroku_team}"
  }

  stack = "container"
}

##
# 3. Create a Heroku Pipeline
##
resource "heroku_pipeline" "pipeline" {
  name = "${var.app_name}"
}

# Couple apps to different pipeline stages
resource "heroku_pipeline_coupling" "staging" {
  app      = "${heroku_app.staging.name}"
  pipeline = "${heroku_pipeline.pipeline.id}"
  stage    = "staging"
}

resource "heroku_pipeline_coupling" "production" {
  app      = "${heroku_app.production.name}"
  pipeline = "${heroku_pipeline.pipeline.id}"
  stage    = "production"
}

##
# 4, Provision Heroku addons
##
resource "heroku_addon" "cloudinary-staging" {
  app  = "${heroku_app.staging.name}"
  plan = "cloudinary"
}

resource "heroku_addon" "cloudinary-production" {
  app  = "${heroku_app.production.name}"
  plan = "cloudinary"
}

# Comment out the following lines to enable CDN creation
# https://elements.heroku.com/addons/fastly

# resource "heroku_addon" "fastly-staging" {
#   app  = "${heroku_app.staging.name}"
#   plan = "fastly:quick"
# }

resource "heroku_addon" "fastly-production" {
  app  = "${heroku_app.production.name}"
  plan = "fastly:quick"
}


resource "heroku_addon" "redis-staging" {
  app  = "${heroku_app.staging.name}"
  plan = "heroku-redis:hobby-dev"
}

resource "heroku_addon" "redis-production" {
  app  = "${heroku_app.production.name}"
  plan = "heroku-redis:hobby-dev"
}
