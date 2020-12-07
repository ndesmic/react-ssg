export const scripts = new Set();

export function addScript(path){
	scripts.add(path);
}
export function getScripts(){
	return [...scripts];
}