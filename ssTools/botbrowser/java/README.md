# browser bot with java

require

- `java`
- `jdk`
- `apache maven`

## instalasi

buat path maven terlebih dahulu agar dapat dieksekusi nantinya.
pathnya sesuaikan dengan lokasi maven kamu.
buka terminal kamu.

```bash
export MAVEN_HOME=maven
export PATH=$PATH:$MAVEN_HOME/bin
```

buat project dengan perintah berikut:

```bash
mvn archetype:generate -DgroupId=com.browserbot -DartifactId=browserbot -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

masuk ke directory project yang telah dibuat.

```bash
cd browserbot
```

edit file `pom.xml`. gunakan code editor.
tambahkan kode berikut setelah tag `<url/>`.

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.codehaus.mojo</groupId>
            <artifactId>exec-maven-plugin</artifactId>
            <version>3.0.0</version>
            <executions>
                <execution>
                    <goals>
                        <goal>java</goal>
                    </goals>
                </execution>
            </executions>
            <configuration>
                <mainClass>com.browserbot.App</mainClass>
            </configuration>
        </plugin>
        <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-shade-plugin</artifactId>
        <version>3.2.4</version>
        <executions>
            <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
            <configuration>
                <transformers>
                <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                    <mainClass>com.browserbot.App</mainClass>
                </transformer>
                </transformers>
            </configuration>
            </execution>
        </executions>
        </plugin>
    </plugins>
</build>
```

tambahkan juga kode berikut didalam tag `<dependencies>`.

```xml
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>3.141.59</version>
</dependency>
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.8.8</version>
</dependency>
```

sehingga hasil kode keseluruhan dari file `pom.xml` akan terlihat sebagai berikut.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.browserbot</groupId>
  <artifactId>browserbot</artifactId>
  <packaging>jar</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>browserbot</name>
  <url>http://maven.apache.org</url>
  <build>
      <plugins>
          <plugin>
              <groupId>org.codehaus.mojo</groupId>
              <artifactId>exec-maven-plugin</artifactId>
              <version>3.0.0</version>
              <executions>
                  <execution>
                      <goals>
                          <goal>java</goal>
                      </goals>
                  </execution>
              </executions>
              <configuration>
                  <mainClass>com.browserbot.App</mainClass>
              </configuration>
          </plugin>
          <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>3.2.4</version>
            <executions>
              <execution>
                <phase>package</phase>
                <goals>
                  <goal>shade</goal>
                </goals>
                <configuration>
                  <transformers>
                    <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                      <mainClass>com.browserbot.App</mainClass>
                    </transformer>
                  </transformers>
                </configuration>
              </execution>
            </executions>
          </plugin>
      </plugins>
  </build>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>3.141.59</version>
    </dependency>
    <dependency>
        <groupId>com.google.code.gson</groupId>
        <artifactId>gson</artifactId>
        <version>2.8.8</version>
    </dependency>
  </dependencies>

</project>
```

copy file App.java yang ada di directory utama ke directory `src/main/java/com/browserbot`.
jalankan perintah berikut:

```sh
cp ../App.java src/main/java/com/browserbot/App.java
```

kemudian install

```bash
mvn clean install
```

copy chromedriver dan geckodriver ke directory `target`

```bash
cp ../chromedriver ../geckodriver target/
```

## menjalankan tools

compile dengan perintah

```bash
mvn compile exec:java
```

atau

```sh
mvn exec:java -Dexec.mainClass="com.browserbot.App"
```

pindah ke directory `target`

```sh
cd target
```

jalankan toolsnya.

```sh
java -jar browserbot-1.0-SNAPSHOT.jar
```

## penggunaan

untuk menggunakan program ini, tambahkan argument `--address` dan `--cookie`.

```bash
java -jar browserbot-1.0-SNAPSHOT.jar --address https://facebook.com --cookie 'name1=value1;name2=value2'
```

`--address`: merupakan alamat yang akan dituju. Dalam contoh diatas yaitu halaman `https://facebook.com`. <br/>
`--cookie`: merupakan cookie kamu. Dalam contoh diatas terdapat cookie name dan cookie value. cookie **name** terdiri dari `name1` dan `name2`, sedangkan cookie **value** terdiri dari `value1` dan `value2`.

## kesimpulan

jadi nantinya browser kamu akan terbuka kemudian mengunjungi alamat yang dituju dengan cookie yang sudah ditambahkan.
