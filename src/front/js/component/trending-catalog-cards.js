import React from "react";
import "../../styles/homepage.css";
import {Table } from "react-bootstrap";


const Card = () => {
    return (
      <>
        <div className="table-container">
          <Table striped bordered>
            <thead>
              <tr>
                <th>Book Cover</th>
                <th>Book Description</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
            <tr>
            <td><img src="https://api.time.com/wp-content/uploads/2023/05/best-books-of-the-year-2023-alivingremedy.jpg?quality=85&w=800" className="img-fluid rounded-start" alt="Card" /></td>
            <td>In her first memoir, TIME contributor Nicole Chung described her experience growing up as a Korean American adoptee in a predominantly white town. Her follow-up, A Living Remedy, continues her exploration into identity, this time focusing on her grief after losing both of her parents. Chung’s father died of diabetes and kidney disease in 2018. Then, less than a year later, her mother is diagnosed with cancer and later dies during the COVID-19 pandemic. As Chung wrestles with these overwhelming losses in A Living Remedy, she dissects the inequities inherent to American society by recounting the challenges her parents faced in accessing medical care. The result is a moving portrait of a daughter reckoning with her place in a broken world—and making sense of life without her parents in it.</td>
            <td>1. A Living Remedy, Nicole Chung</td>
          </tr>
          <tr>
            <td><img src="https://api.time.com/wp-content/uploads/2023/05/best-books-of-the-year-2023-kingalife.jpg?quality=85&w=800" className="img-fluid rounded-start" alt="Card" /></td>
            <td>Jonathan Eig’s book on Martin Luther King Jr. is the first biography of the civil rights icon in decades. It’s a refreshing portrait of King, offering an intimate look inside the life of a man whose massive contributions to American history are known but whose emotional complexities are less so. Eig digs into everything—King’s family origins, his relationship with his wife, the pressures he faced from being so influential so early in his career—to create a portrait of the late activist that captures the dynamic and flawed human that he was. It’s a deftly researched and highly accessible account of a leader, and a new view into the many overlooked parts of King’s story.</td>
            <td>2. King: A Life, Jonathan Eig</td>
          </tr>
          <tr>
            <td><img src="https://api.time.com/wp-content/uploads/2023/05/best-books-of-the-year-2023-ourshareofnight_.jpg?quality=85&w=800" className="img-fluid rounded-start" alt="Card" /></td>
            <td>Spanning multiple decades, Argentine author Mariana Enriquez’s weird and wonderful novel, newly translated into English by Megan McDowell, doesn’t fit into just one genre. Oscillating seamlessly between historical fiction and supernatural horror, Our Share of Night centers on Juan and Gaspar, a father and son who are grieving Rosario, the wife and mother they just lost in a car accident. Complicating things is the fact that they are also on the run from the ruthless cult from which Rosario descends. Better known as the Order, the cult will do just about anything to achieve immortality, and Gaspar has developed powers that would make him a valuable asset. Set against a comprehensive backdrop of Argentine history, Our Share of Night offers an absorbing window into a terrifying, fantastical world.</td>
            <td>3. Our Share of Night, Mariana Enriquez</td>
          </tr>
            </tbody>
          </Table>
        </div>
      </>
    );
  };
  

export default Card;
