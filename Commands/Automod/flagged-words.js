const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType, Client, ChatInputCommandInteraction } = require ("discord.js");
const { ClientID } = require("../../config.json");
const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
    subCommand: "automod.flagged_words",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction,  client) {
    await interaction.deferReply()
  
  if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.editeply({content: `**Flagged Words** AutoMod kuralını açmak için **Yönetici** yetkisine sahip olmalısın!`})

  const { guild, options } = interaction  
      
      await interaction.editReply({content: `**Flagged Words** AutoMod kuralı kuruluyor...`})
      
      const Kural = await guild.autoModerationRules.create({
        name: 'Flagged words',
        creatorId: ClientID,
        enabled: true,
        eventType: 1,
        triggerType: 4,
        triggerMetadata: {
          presets: [1, 2, 3]
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
          await interaction.editReply({content: `**Flagged Words** AutoMod kuralı uygulanırken bir hata meydana geldi!\nHata: **\`${hata}\`**\n\n**Hatanın Sebepleri**\n**1.** Flagged Words en fazla 1 kere kurulabilir\n**2.** Şuanda kurulu bir tane olabilir.`})
        }, 2000)
      })
      setTimeout(async () => {
        if(!Kural) return 
        await interaction.editReply({content: `**Flagged Words** AutoMod kuralı başarılı şekilde oluşturuldu ✅`})
      }, 3000)

    }
}