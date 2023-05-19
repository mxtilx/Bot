/**
 * @package YuukiPS
 * @author Yuuki
 * @license GPL-3.0
 */

// This is important
import { sleep, isEmpty, contains } from "../util/library";
import Config from '../util/config';
import Logger from "../util/logger";

// API Discord
import { MessageReaction, User } from "discord.js";

const log = new Logger('Discord-Event-MessageReaction');

export default async function run(reaction: MessageReaction, user: User) {
    try {

        // Ignore reactions from other bots
        if (user.bot) return

        // You are correct that the MessageReaction object that is passed to messageReactionAdd event handler is a partial object, and it does not contain the full message object. In order to get the full message object, you will need to fetch the message using the fetch() method.
        if (reaction.partial) {
            try {
                await reaction.fetch()
            } catch (error) {
                log.error(error as Error)
                return
            }
        }

        var channelId = reaction.message.channel.id
        var is = reaction.emoji.name
        var id_user = user.id // whos reaction
        var name_user = user.username

        if (reaction == undefined || reaction.message == undefined || reaction.message.author == undefined) {
            return;
        }

        var id_user_to_reaction = reaction.message.author.id // whos message
        var name_user_get_reaction = reaction.message.author.username // whos message
        var msg = reaction.message.content

        const id_role_member = "1039554857746583573" // id member
        const id_role_mute = "1040051266912534598" // id mute member

        log.debug(`LOG Reaction: ${name_user} ${is} -> ${channelId}`)

        // Get role object for role id
        const guild = reaction.message.guild

        if (guild == undefined) {
            return;
        }

        const muteRole = guild.roles.cache.get(id_role_mute)
        const MemberRole = guild.roles.cache.get(id_role_member)

        if (muteRole == undefined || MemberRole == undefined) {
            return
        }

        // Get user id from message that get reaction
        const member_get_reaction = guild.members.cache.get(id_user_to_reaction)

        if (member_get_reaction == undefined) {
            return
        }

        const member_get_reaction_have = member_get_reaction.roles.cache

        // Get user id from person doing reaction
        const member_give_reaction = guild.members.cache.get(id_user)
        if (member_give_reaction == undefined) {
            return
        }
        const member_give_reaction_have = member_give_reaction.roles.cache

        // Mod Control
        if (member_give_reaction_have.some((role: { id: any }) => Config.id_mod.includes(role.id))) {
            if (!member_get_reaction_have.some((role: { id: any }) => Config.id_mod.includes(role.id))) {
                if (is === "🔒") {
                    log.warn(`lock ${name_user_get_reaction}`)
                    // Check if user already has the mute role
                    if (member_get_reaction_have.has(muteRole.id)) {
                        log.warn(`${name_user_get_reaction} already has mute role, so do nothing`)
                    } else {
                        log.info(`${name_user_get_reaction} set mute role`)
                        member_get_reaction.roles.add(muteRole)

                        if (member_get_reaction_have.has(id_role_member)) {
                            log.info(`${name_user_get_reaction} remove member`)
                            member_get_reaction.roles.remove(MemberRole)
                        } else {
                            log.warn(`${name_user_get_reaction} no member, so do nothing`)
                        }
                    }
                } else if (is === "🔓") {
                    log.warn(`unlock ${name_user_get_reaction}`)

                    if (member_get_reaction_have.has(muteRole.id)) {
                        log.info(`${name_user_get_reaction} set unlock...`)
                        member_get_reaction.roles.remove(muteRole)
                    } else {
                        log.warn(`${name_user_get_reaction} does not have mute role, so do nothing`)
                    }
                }
            } else {
                log.warn(`${name_user_get_reaction} mod, so skip`)
            }
        }

        // Get Member
        if (channelId == "1039554337438961714") {
            // Check if user already has mute role
            if (member_give_reaction_have.has(muteRole.id)) {
                log.warn(`${name_user} Unable to verify, because it has a mute role`)
            } else {
                // User does not have mute role, so add it
                if (!member_give_reaction_have.has(MemberRole.id)) {
                    member_give_reaction.roles.add(MemberRole)
                    log.info(`${name_user} Has been added as a member`)
                } else {
                    log.warn(`${name_user} Already added as a member`)
                }
            }
        }

    } catch (e) {
        log.error(e as Error)
    }
}