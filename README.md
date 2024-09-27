# minecraft-llm-sandbox

This is a sandbox version of [kolbytn/mindcraft](https://github.com/kolbytn/mindcraft) :heart: 


# Warning! :see_no_evil: 

I use this as a sandbox to play around with ideas and learn new things :nerd_face:

Go to [kolbytn/mindcraft](https://github.com/kolbytn/mindcraft). 
It's a much better version and maintained by its authors and community :heart: 


## Main changes in this repo:

- prismarine-viewer and puppeteer are used for taking screenshots. [prismarine-viewer](https://github.com/PrismarineJS/prismarine-viewer) , [puppeteer](https://github.com/puppeteer/puppeteer)
- :hugs: Transformers is used for image classification and segmentation [xenova/transformers.js](https://github.com/xenova/transformers.js)
- Tesseract.js is used for image-to-text [naptha/tesseract.js](https://github.com/naptha/tesseract.js)


## Installation

Should be the same as the original repo, but keep in mind, unused packets may get installed and aliens may come to earth and take your pc. I am not responsible for any damage to your pc or an alien invasion, please use this at your own risk.

Again: Please go to the original repo :heart: 

## Limitations

- Supported Minecraft versions due to prismarine-viewer: 1.8.8, 1.9.4, 1.10.2, 1.11.2, 1.12.2, 1.13.2, 1.14.4, 1.15.2, 1.16.1, 1.16.4, 1.17.1, 1.18.1, 1.19, 1.20.1. Works on 1.20.4 but has some issues with textures.

- Image classification and segmentation do work but without custom models the output is absolutely useless. (TransformerTraining)[https://github.com/MartinDeanMoriarty/TransformerTraining]

- image-to-text needs extra work to make it reliable.


# Original README.md
--------------------

# Mindcraft 🧠⛏️

Crafting minds for Minecraft with Language Models and Mineflayer!

#### ‼️Warning‼️

This project allows an AI model to write/execute code on your computer that may be insecure, dangerous, and vulnerable to injection attacks on public servers. Code writing is disabled by default, you can enable it by setting `allow_insecure_coding` to `true` in `settings.js`. Enable only on local or private servers, **never** on public servers. Ye be warned.

## Requirements

- [OpenAI API Subscription](https://openai.com/blog/openai-api), [Gemini API Subscription](https://aistudio.google.com/app/apikey), [Anthropic API Subscription](https://docs.anthropic.com/claude/docs/getting-access-to-claude), [Replicate API Subscription](https://replicate.com/) or [Ollama Installed](https://ollama.com/download)
- [Minecraft Java Edition](https://www.minecraft.net/en-us/store/minecraft-java-bedrock-edition-pc)
- [Node.js](https://nodejs.org/) (at least v14)

## Installation

Rename `keys.example.json` to `keys.json` and fill in your API keys, and you can set the desired model in `andy.json` or other profiles.
| API | Config Variable | Example Model name | Docs |
|------|------|------|------|
| OpenAI | `OPENAI_API_KEY` | `gpt-3.5-turbo` | [docs](https://platform.openai.com/docs/models) | (optionally add `OPENAI_ORG_ID`)
| Google | `GEMINI_API_KEY` | `gemini-pro` | [docs](https://ai.google.dev/gemini-api/docs/models/gemini) |
| Anthropic | `ANTHROPIC_API_KEY` | `claude-3-haiku-20240307` | [docs](https://docs.anthropic.com/claude/docs/models-overview) |
| Replicate | `REPLICATE_API_KEY` | `meta/meta-llama-3-70b-instruct` | [docs](https://replicate.com/collections/language-models) |
| Ollama (local) | n/a | `llama3` | [docs](https://ollama.com/library) |

If you use Ollama, to install the models used by default (generation and embedding), execute the following terminal command:
`ollama pull llama3 && ollama pull nomic-embed-text`

Then, clone/download this repository

Run `npm install` from the installed directory

Install the minecraft version specified in `settings.js`, currently supports up to 1.20.4

### Running Locally

Start a minecraft world and open it to LAN on localhost port `55916`

Run `node main.js`

You can configure the agent's name, model, and prompts in their profile like `andy.json`.

You can configure project details in `settings.js`. [See file for more details](settings.js)

### Online Servers
To connect to online servers your bot will need an official Microsoft/Minecraft account. You can use your own personal one, but will need another account if you want to connect with it. Here are example settings for this:
```
"host": "111.222.333.444",
"port": 55920,
"auth": "microsoft",

// rest is same...
```
‼️Make sure your bot's name in the profile.json matches the account name! Otherwise the bot will spam talk to itself.

### Bot Profiles

Bot profiles are json files (such as `andy.json`) that define:

1. Bot backend LLMs to use for chat and embeddings.
2. Prompts used to influence the bot's behavior.
3. Examples help the bot perform tasks.


### Model Specifications

LLM backends can be specified as simply as `"model": "gpt-3.5-turbo"`. However, for both the chat model and the embedding model, the bot profile can specify the below attributes:

```
"model": {
  "api": "openai",
  "url": "https://api.openai.com/v1/",
  "model": "gpt-3.5-turbo"
},
"embedding": {
  "api": "openai",
  "url": "https://api.openai.com/v1/",
  "model": "text-embedding-ada-002"
}
```

The model parameter accepts either a string or object. If a string, it should specify the model to be used. The api and url will be assumed. If an object, the api field must be specified. Each api has a default model and url, so those fields are optional.

If the embedding field is not specified, then it will use the default embedding method for the chat model's api (Note that anthropic has no embedding model). The embedding parameter can also be a string or object. If a string, it should specify the embedding api and the default model and url will be used. If a valid embedding is not specified and cannot be assumed, then word overlap will be used to retrieve examples instead.

Thus, all the below specifications are equivalent to the above example:

```
"model": "gpt-3.5-turbo"
```
```
"model": {
  "api": "openai"
}
```
```
"model": "gpt-3.5-turbo",
"embedding": "openai"
```

## Patches

Some of the node modules that we depend on have bugs in them. To add a patch, change your local node module file and run `npx patch-package [package-name]`
