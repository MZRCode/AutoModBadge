const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType, Client, ChatInputCommandInteraction } = require ("discord.js");
const { ClientID } = require("../../config.json");
const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
    subCommand: "automod.keyword",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction,  client) {        
        await interaction.deferReply()
  
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.editeply({content: `**Keyword** AutoMod kuralını açmak için **Yönetici** yetkisine sahip olmalısın!`})      
        
        const { guild, options } = interaction  

        await interaction.editReply({content: `**Keyword** AutoMod kuralı kuruluyor...`})
        const Kelime = interaction.options.getString('kelime')

        const Kural = await guild.autoModerationRules.create({
            name: 'Keyword',
            creatorId: ClientID,
            enabled: true,
            eventType: 1,
            triggerType: 1,
            triggerMetadata: {
              keywordFilter: [`${Kelime}`]
            },
            actions: [{
                type: 1,
                metadata: {
                  channel: interaction.channel,
                  durationSeconds: 10,
                  customMessage: 'Your message was blocked by AutoMod.'
                }
              }]
        }).catch(async hata => {
          setTimeout(async () => {
            await interaction.editReply({content: `**Keyword** AutoMod kuralı uygulanırken bir hata meydana geldi!\nHata: **\`${hata}\`**\n\n**Hatanın Sebepleri**\n**1.** Keyword en fazla 6 kere kurulabilir\n**2.** 6'dan fazla kurmuş olabilirsiniz.`})
          }, 2000)
        })
        setTimeout(async () => {
          if(!Kural) return 
          await interaction.editReply({content: `**Keyword** AutoMod kuralı başarılı şekilde oluşturuldu ✅\n**\`${Kelime}\`** Kelimesi Yasakladı!`})
        }, 3000)
      }
}