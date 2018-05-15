#!/usr/bin/env ruby
require 'webrick'

server = WEBrick::HTTPServer.new Port: 3000, DocumentRoot: Dir.pwd

trap 'INT' do
  server.shutdown
end

server.mount_proc '/' do |request, response|
  file_path = File.join Dir.pwd, request.path
  response.body =
    if request.path == '/' and File.exist? 'index.html'
      File.read 'index.html'
    elsif File.exist? file_path
      File.read file_path
    elsif File.exist? '404.html'
      File.read '404.html'
    else
      <<-BODY
        #{request.inspect}
        #{response.inspect}
      BODY
    end
end

server.start
