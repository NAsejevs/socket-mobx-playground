import React, { RefObject } from "react";
import styles from "./index.pcss";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";

@observer
class App extends React.Component<any> {
	private inputRef: RefObject<HTMLInputElement>;

	constructor(props: any) {
		super(props);

		this.inputRef = React.createRef();
	}

	sendMessage = () => {
		if(this.inputRef.current) {
			this.props.rootStore.sendMessage(this.inputRef.current.value);
			this.inputRef.current.focus();
			this.inputRef.current.value = "";
		}
	}

	connectionError = () => {
		return (
			<div>Connection error, reconnecting...</div>
		);
	}

	render() {
		console.log(this.props.rootStore.connected);
		if(!this.props.rootStore.connected) {
			return this.connectionError();
		}
		return (
			<div className={styles.App}>
				<h1>Messages</h1>
				<input ref={this.inputRef}/>
				<button onClick={this.sendMessage}>Send</button>
				{this.props.rootStore.messages.map((message: string, index: number) => {
					return (
						<div key={index}>{message}</div>
					);
				})}
			</div>
		);
	}
}

const AppConnected = inject((stores: any) => ({
    rootStore: stores.rootStore
}))(App)


export default AppConnected;
