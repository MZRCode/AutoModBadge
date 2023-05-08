const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Yardım Menüsünü Gösterir"),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client){
        const embed = new EmbedBuilder()
        .setTitle("Yardım Menüm")
        .addFields([
            {name: "AutoMod Komutlarım", value: `<:AutoMod:1104852145175531552> **/automod flagged_words**\n Ağır Küfürleri, Hakaret ve Kötülemeleri, Cinsel içerikleri engeller\n*(Sadece 1 kere kurabilirsiniz)*\n\n<:AutoMod:1104852145175531552> **/automod keyword [kelime]**\n Yazdığınız kelimenin yazılmasını engeller\n*(En fazla 6 kere kurabilirsiniz)*\n\n<:AutoMod:1104852145175531552> **/automod mention_spam**\n 1 Mesajda 5'den fazla kişiyi etikler ise o mesajın gönderimini engeller\n*(Sadece 1 kere kurabilirsiniz)*\n\n<:AutoMod:1104852145175531552> **/automod spam_messages**\n Spam yapılmasını engeller\n*(Sadece 1 kere kurabilirsiniz)*`, inline: false},
            {name: "Kullanıcı Komutlarım", value: `<:member:1104854676878413894> **/help**\nYardım menüsünü gösterir\n\n<:member:1104854676878413894> **/ping**\nBotun pingini gösterir\n\n<:member:1104854676878413894> **/invite**\nBotu davet edersiniz ve destek sunucusuna katılabilirsiniz`, inline: true},
        ])
        .setFooter({ text: "Toplamda 1 sunucuya 9 adet AutoMod kuralı ekliyebilirsiniz."})
        .setColor("Random")
        interaction.reply({embeds: [embed], ephemeral: true});

    }

}