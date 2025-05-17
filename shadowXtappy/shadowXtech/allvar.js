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












import dotenv from 'dotenv';

import fs from 'fs';

import path from 'path';

import config from '../../config.cjs';

// Load .env variables

dotenv.config();

const allVarCommand = async (m, Matrix) => {

    const text = m.message?.conversation || m.message?.extendedTextMessage?.text || null; // Extract text

    const prefix = config.PREFIX;

    // Ignore group and broadcast messages

    if (m.key.remoteJid.endsWith('@g.us') || m.key.remoteJid === 'status@broadcast') {

        console.log('Group or broadcast message ignored.');

        return;

    }

    // Check if the command is `allvar`

    if (text === `${prefix}allvar`) {

        if (m.sender !== config.OWNER_NUMBER + '@s.whatsapp.net') {

            await Matrix.sendMessage(m.from, { text: '📛 THIS IS AN OWNER COMMAND' }, { quoted: m });
            
    await m.React('⏳');
            return;

        }

        try {

            // Path to the .env file

            const envFilePath = path.resolve(process.cwd(), '.env');

            // Check if .env file exists

            if (!fs.existsSync(envFilePath)) {

                await Matrix.sendMessage(

                    m.from,

                    { text: '❌ .env file not found. Make sure it exists in the project root.' },

                    { quoted: m }

                );

                return;

            }

            // Read and parse the .env file

            const envContent = fs.readFileSync(envFilePath, 'utf-8');

            const envVariables = envContent

                .split('\n') // Split by lines

                .filter(line => line.trim() && !line.startsWith('#')) // Exclude comments and empty lines

                .map(line => {

                    const [key, ...valueParts] = line.split('=');

                    const value = valueParts.join('=').trim(); // Handle cases with '=' in the value

                    return `🔑 ${key.trim()}: ${value}`;

                })

                .join('\n');

            // Send the variables to the owner

            const message = `🔐 **Environment Variables**\n\n${envVariables}`;
            
            await Matrix.sendMessage(m.from, { text: message }, { quoted: m });
            await m.React('✅'); 

        } catch (err) {

            console.error('Error reading .env file:', err.message);

            await Matrix.sendMessage(

                m.from,

                { text: '❌ Failed to read environment variables. Check server logs for more details.' },

                { quoted: m }

            );

        }

    }

};

export default allVarCommand;