/**
 * Gets the Ids of the containers which are controlled by element or the elements controlling element.
 *
 * @param      {HTMLElement}  element
 * @returns    {Array} { Array of HTML elements }
 */
getContainerIds = function(element, utils) {
	if(element){
		var elControllingParentMenu = utils.getControllingElementId(element);
		if(elControllingParentMenu)
			return utils.getIdsOfControlledContainers(elControllingParentMenu);
		else
			return[element.id];
	}
};

module.exports = getContainerIds;
