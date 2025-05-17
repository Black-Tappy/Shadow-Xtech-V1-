 /*                              
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
made by Black-Tappy
contact owner +254759000340

CURRENTLY RUNNING ON BETA VERSION!!
*
   * @project_name : Shadow-Xtech-V1 
   * @author : Ⴊl𐌀Ꮳk𐌕𐌀ႲႲჄ
   * @youtube : https://www.youtube.com/@Black-Tappy
   * @infoription : Shadow-Xtech-V1 ,A Multi-functional whatsapp user bot.
   * @version 10 
*
   * Licensed under the  GPL-3.0 License;
* 
   * ┌┤Created By Black-Tappy tech info.
   * © 2025 Shadow-Xtech-V1 ✭ ⛥.
   * plugin date : 16/5/2025
* 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
*/


import axios from "axios";
import { createRequire } from "module";

// Import config.cjs using createRequire
const require = createRequire(import.meta.url);
const config = require("../../config.cjs");

const ytsCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : "";
  const validCommands = ["yts", "ytsearch"];

  if (validCommands.includes(cmd)) {
    const searchQuery = m.body.split(" ").slice(1).join(" ");

    if (!searchQuery) {
      await gss.sendMessage(
        m.from,
        { text: "Oops~! ❌ You forgot to tell me what to search for! 🥺 Please add a query after the command, pretty please~" },
        { quoted: m }
      );
      return;
    }

    const apiUrl = `https://www.dark-yasiya-api.site/search/yt?text=${encodeURIComponent(searchQuery)}`;

    try {
      const response = await axios.get(apiUrl);
      const apiData = response.data;

      if (apiData.status && apiData.result) {
        const videos = apiData.result.data;

        if (!videos || videos.length === 0) {
          await gss.sendMessage(
            m.from,
            { text: "Sorry~ ❌ I couldn’t find anything for that search... 😿 Please try something else, my dear!" },
            { quoted: m }
          );
          return;
        }

        // If you want to make the number of results configurable in config.cjs
        const resultCount = config.YTS_RESULT_COUNT || 10; // Default to 10 if not set
        let message = `*Aaww~! I found some super cute YouTube results for you!* 💖\n*“${searchQuery}”* 🌸\n\n`;
        message += `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`;
        message += ` Top ${resultCount} Results  \n`;
        message += `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`;

        // Show the top N results (configured or default 10)
        videos.slice(0, resultCount).forEach((video, index) => {
          message += `*${index + 1}. ${video.title}* 🌟\n`;
          message += `⏳ *Duration:* ${video.duration?.timestamp || "N/A"}\n`;
          message += `👀 *Views:* ${video.views || "Wow~ So many views, so cute!"}\n`;
          message += `👤 *Author:* ${video.author?.name || "A mysterious creator~"}\n`;
          message += `🔗 *[Watch here](https://youtube.com/watch?v=${video.videoId})*\n`;
          message += `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`;
        });

        const messagePayload = {
          text: message,
          contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363369453603973@newsletter',
              newsletterName: "ꜱʜᴀᴅᴏᴡ-xᴛᴇᴄʜ",
              serverMessageId: -1,
            },
            externalAdReply: {
              title: "ꜱʜᴀᴅᴏᴡ-xᴛᴇᴄʜ",
              body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʙʟᴀᴄᴋ-ᴛᴀᴘᴘʏ",
              thumbnailUrl:
                'https://files.catbox.moe/3hrxbh.jpg',
              sourceUrl: 'https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10',
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        };

        await gss.sendMessage(m.from, messagePayload, { quoted: m });
      } else {
        await gss.sendMessage(
          m.from,
          { text: "Oops~ ❌ Something went wrong while fetching the videos... 😿 I'll try again soon, okay?!" },
          { quoted: m }
        );
      }
    } catch (error) {
      console.error("Error in YTS Command:", error.message || error);
      await gss.sendMessage(
        m.from,
        { text: "Whoosh~! ❌ I ran into a lil' problem while searching... 😿 Please try again in a bit, pretty please?" },
        { quoted: m }
      );
    }
  }
};
// created by Black-Tappy
export default ytsCommand;