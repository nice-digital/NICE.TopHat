function getContainerIds(parentMenuEl, domUtils) {
	if(parentMenuEl){
		var elControllingParentMenu = domUtils.getControllingElementId(parentMenuEl);
		if(elControllingParentMenu)
			return domUtils.getIdsOfControlledContainers(elControllingParentMenu);
		else
			return[parentMenuEl.id];
	}
}

module.exports = getContainerIds;
