-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

/*
*OBJETIVO: RETORNAR UMA LISTA COM NO MÁXIMO 10 PROFISSIONAIS
*ORDERNANDO POR: DATA DO ULTIMO ATENDIMENTO (ASC) E MÉDIA DA NOTA (DESC)
*A ideia inicial é priorizar os profissionais que estão a mais tempo
*sem fazer atendimento mas também priorizar quem tem uma média maior
*/

CREATE DEFINER=`b51446ac077a06`@`%` PROCEDURE `sp_cons_profissional_atendimento`(
	IN `p_cidade` varchar(200)
)
BEGIN

	SELECT 
		PROF_ID
	FROM
		PROFISIONAL
		JOIN USUARIO
		ON (USUA_ID = PROF_USUA_ID)
	WHERE
		PROF_FLAG_ATIVO = 1
	AND
		USUA_CIDADE = p_cidade
	ORDER BY
		/*DATA DO ÚLTIMO ATENDIMENTO ASC*/
		PROF_MEDIA DESC
		LIMIT 10;

END


-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE FUNCTION `get_dt_ultimo_atdt_profissional` (
	`p_prof_id` INT(11) 
)
RETURNS DATE
BEGIN
	
	DECLARE DT_RETURN DATE;

	/*SELECT 
		ATPG_DT
	INTO
		DT_RETURN
	FROM
		ATENDIMENTO_PG
		JOIN ATENDIMENTO
		ON( ATDT_ID = ATPG_ATDT_ID)
		JOIN PROPOSTA
		ON (PROP_ID = ATDT_PROP_ID)
	WHERE
		PROP_PROF_ID = p_prof_id;*/

RETURN DT_RETURN;
END