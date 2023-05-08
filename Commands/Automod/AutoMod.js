const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("automod")
    .setDescription("Auto Mod Sistemi")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
    .setName("flagged_words")
    .setDescription("Ağır Küfürleri, Hakaret ve Kötülemeleri, Cinsel içerikleri Engeller"))
    .addSubcommand((options) => options
    .setName("spam_messages")
    .setDescription("Spam yapılmasını Engeller"))
    .addSubcommand((options) => options
    .setName("mention_spam")
    .setDescription("1 Mesajda 5'den fazla kişiyi etikler ise o mesajın gönderimini Engeller"))
    .addSubcommand((options) => options
    .setName("keyword")
    .setDescription("Yazdığınız kelimenin yazılmasını Engeller")
    .addStringOption(option =>
        option
          .setName('kelime')
          .setDescription('Engellenecek Kelimeyi Yazınız')
          .setRequired(true))),
}