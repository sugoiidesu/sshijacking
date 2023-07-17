require 'json'


def format_data(data)
  nama_array = data['nama']
  isi_array = data['isi']

  if nama_array.length != isi_array.length
    return ''
  end

  formatted_string = ''

  nama_array.each_with_index do |nama, index|
    formatted_string += "#{nama}=#{isi_array[index]}"

    unless index == nama_array.length - 1
      formatted_string += ';'
    end
  end

  formatted_string
end

unless ARGV.length == 2 && ARGV[0] == '-f'
  puts 'Penggunaan: ruby program.rb -f <nama_file.json>'
  exit(1)
end

filename = ARGV[1]

begin
  json_data = File.read(filename)
rescue Errno::ENOENT
  puts "File tidak ditemukan: #{filename}"
  exit(1)
rescue IOError => e
  puts "Gagal membaca file: #{filename}"
  exit(1)
end

begin
  data = JSON.parse(json_data)
rescue JSON::ParserError => e
  puts "Gagal memparse JSON: #{e}"
  exit(1)
end

puts format_data(data)

