threads_count = ENV.fetch("RAILS_MAX_THREADS", 3).to_i
threads threads_count, threads_count

port ENV.fetch("PORT", 3000)

pidfile ENV.fetch("PIDFILE", "tmp/pids/server.pid")

environment ENV.fetch("RAILS_ENV", "development")

if ENV["RAILS_ENV"] == "production"
  activate_control_app
  require 'puma/plugin/systemd'
  plugin :systemd
end

plugin :tmp_restart

