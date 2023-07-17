require 'json'


def format_data(data)
  nama_array = data['nama']
  isi_array = data['isi']

  # Periksa apakah nama_array dan isi_array memiliki jumlah elemen yang sama
  if nama_array.length != isi_array.length
    return ''
  end

  formatted_string = ''

  nama_array.each_with_index do |nama, index|
    formatted_string += "#{nama}=#{isi_array[index]}"

    # Tambahkan tanda ';' setiap kecuali elemen terakhir
    unless index == nama_array.length - 1
      formatted_string += ';'
    end
  end

  formatted_string
end


# Periksa apakah argumen yang diberikan sesuai dengan format yang diharapkan
unless ARGV.length == 2 && ARGV[0] == '-f'
  puts 'Penggunaan: ruby program.rb -f <nama_file.json>'
  exit(1)
end

filename = ARGV[1]

# Baca file JSON
begin
  json_data = File.read(filename)
rescue Errno::ENOENT
  puts "File tidak ditemukan: #{filename}"
  exit(1)
rescue IOError => e
  puts "Gagal membaca file: #{filename}"
  exit(1)
end

# Memparsing JSON
begin
  data = JSON.parse(json_data)
rescue JSON::ParserError => e
  puts "Gagal memparse JSON: #{e}"
  exit(1)
end

# Lakukan pemrosesan sesuai kebutuhan Anda dengan data
puts format_data(data)

