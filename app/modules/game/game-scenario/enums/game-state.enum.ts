export enum GameState {

	START,

	/**
	 * Selects between Master & Slave
	 */
	CHOOSE_ROLE,

	/**
	 * Select name, maybe some other optional stuff
	 */
	CHOOSE_NAME,

	/**
	 * Awaits everyone
	 */
	LOBBY,

	CHOOSE_PLAYER_TOKEN,

	ASSEMBLE_FIELD,

	ROLL_DICE,

	ERROR,

	END
}
