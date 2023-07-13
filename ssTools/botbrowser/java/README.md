## buat path

export MAVEN_HOME=/path/to/maven
export PATH=$PATH:$MAVEN_HOME/bin

## buka terminal jalankan perintah berikut

mvn archetype:generate -DgroupId=com.browserbot -DartifactId=browserbot -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false

cd browserbot

edit pom.xml

tambahkan kode berikut setelah tag </url>
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

tambahkan kode berikut didalam tag <dependencies>

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
cp ../App.java src/main/java/com/browserbot/App.java
mvn clean install

mvn compile exec:java
mvn exec:java -Dexec.mainClass="com.browserbot.App"

cp ../chromedriver ../geckodriver target/
cd target
java -jar browserbot-1.0-SNAPSHOT.jar

---
