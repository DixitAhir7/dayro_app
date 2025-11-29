import requests
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re

url = "https://ourworldindata.org/technology-long-run"

requests.get(url, params=None)

page = urlopen(url)
html_bytes = page.read().decode("utf-8")

soup = BeautifulSoup(html_bytes, "html.parser")
text = soup.get_text()


with open("parseddata.md", "a") as file:
    file.write(text)


# title_index = html_content.find("<title>")

# start_index = title_index + len("<title>")

# end_index = html_content.find("</title>")

# title = html_content[start_index:end_index]


# string = "Everything is <replaced> if it's in <tags>."

# idk = re.sub("<.*>", "ELEPHANTS", string)
# print(idk)