require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Servir archivos estáticos
  config.public_file_server.enabled = ENV["RAILS_SERVE_STATIC_FILES"].present?
  config.public_file_server.headers = {
    "Cache-Control" => "public, max-age=#{1.year.to_i}"
  }

  # Cacheo y recolección temprana
  config.enable_reloading = false
  config.eager_load = true
  config.consider_all_requests_local = ENV.fetch("CONSIDER_ALL_REQUESTS_LOCAL", "false") == "true"
  config.action_controller.perform_caching = true

  # Activos
  config.assets.compile = false
  config.assets.digest = true
  config.assets.prefix = "/assets"
  config.asset_host = ENV["ASSET_HOST"] || "http://127.0.0.1:3000"

  # Almacenamiento
  config.active_storage.service = :local

  # SSL
  config.force_ssl = ENV.fetch("FORCE_SSL", "true") == "true"

  # Logging
  config.logger = ActiveSupport::Logger.new(STDOUT, 10, 50.megabytes)
    .tap { |logger| logger.formatter = ::Logger::Formatter.new }
    .then { |logger| ActiveSupport::TaggedLogging.new(logger) }

  config.log_tags = [:request_id]
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info")
  config.action_mailer.perform_caching = false

  # Internacionalización
  config.i18n.fallbacks = true

  # Deprecaciones y esquema
  config.active_support.report_deprecations = false
  config.active_record.dump_schema_after_migration = false
  config.active_record.attributes_for_inspect = [:id]

  # Host permitidos
  config.hosts.clear # Permitir cualquier host
end
