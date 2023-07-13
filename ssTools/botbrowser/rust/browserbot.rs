use thirtyfour::prelude::*;
use thirtyfour::cookie::{Cookie, SameSite};
use url::Url;
use clap::{App, Arg};
use serde::{Serialize, Deserialize};


#[derive(Serialize, Deserialize)]
struct GetCookie {
    name: String,
    value: String,
}

#[tokio::main]
async fn main() -> WebDriverResult<()> {
    let matches = App::new("Cookie Program")
        .arg(
            Arg::with_name("address")
                .short("a")
                .long("address")
                .value_name("ADDRESS")
                .help("Sets the address")
                .takes_value(true)
                .required(true),
        )
        .arg(
            Arg::with_name("cookie")
                .short("c")
                .long("cookie")
                .value_name("COOKIE")
                .help("Sets the cookie")
                .takes_value(true)
                .required(true),
        )
        .get_matches();

    let address = matches.value_of("address").unwrap();
    let cookie_data = matches.value_of("cookie").unwrap();

    println!("Address: {}", address);
    println!("Cookie: {}", cookie_data);

    // let caps = DesiredCapabilities::firefox(); //jika pake firefox
    let caps = DesiredCapabilities::chrome(); // jika pake chrome

    let driver = WebDriver::new("http://localhost:4444", caps).await?;
    
    let parsed_url = Url::parse(address)?;
    let domain_parse: Option<&str> = parsed_url.host_str();
    let domen: String = domain_parse.unwrap_or_default().to_string();


    let cookies: Vec<GetCookie> = cookie_data.split(';')
        .filter(|cookie| !cookie.is_empty())
        .map(|cookie| {
            let parts: Vec<&str> = cookie.split('=').collect();
            GetCookie {
                name: parts[0].to_string(),
                value: parts[1].to_string(),
            }
        })
        .collect();
    
    driver.goto(address).await?;

    for (_,cookie) in cookies.iter().enumerate() {
        
        let mut kuki = Cookie::new(cookie.name.clone(), cookie.value.clone());
        kuki.set_domain(domen.clone());
        kuki.set_path("/");
        kuki.set_same_site(SameSite::None);
        driver.add_cookie(kuki).await?;
    }

    driver.goto(address).await?;


    Ok(())
}