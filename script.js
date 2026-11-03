(function () {
  const example = document.getElementById("example");
  const cw1 = document.getElementById("cw1");
  const cw2 = document.getElementById("cw2");
  const cw3 = document.getElementById("cw3");
  const answer = document.getElementById("answer");
  const postId = document.getElementById("postId");

  example.addEventListener("click", function () {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((array) => {
        console.log(array);
        answer.innerHTML = JSON.stringify(array);
      });
  });

  cw1.addEventListener("click", function () {
    answer.innerHTML = "Processing...";

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "Nowy post",
        body: "Treść nowego posta",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        answer.innerHTML = `Dodano nowy post o ID = ${data.id}`;
      });
  });

  cw2.addEventListener("click", function () {
    const id = postId.value;

    const popup = document.createElement("div");
    popup.innerText = "Loading";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "blue";
    popup.style.color = "white";
    popup.style.padding = "20px 40px";
    popup.style.borderRadius = "8px";
    popup.style.fontWeight = "bold";
    document.body.appendChild(popup);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((post) => {
        popup.remove();
        console.log(post);

        answer.innerHTML = `
          <table style="width: 100%; text-align: center; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="border: 1px solid #ccc; padding: 8px;">ID</th>
                <th style="border: 1px solid #ccc; padding: 8px; color: red;">Tytuł</th>
                <th style="border: 1px solid #ccc; padding: 8px; color: green;">Treść</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px;">${post.id}</td>
                <td style="border: 1px solid #ccc; padding: 8px; color: red;">${post.title}</td>
                <td style="border: 1px solid #ccc; padding: 8px; color: green;">${post.body}</td>
              </tr>
            </tbody>
          </table>
        `;
      });
  });

  cw3.addEventListener("click", function () {
    answer.innerHTML = "Loading...";

    fetch("https://6aea48ee3d3dd3d37be65797.mockapi.io/api/paw/users")
      .then((response) => response.json())
      .then((users) => {
        let tableHTML = `
          <table style="width: 100%; text-align: center; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="border: 1px solid #ccc; padding: 8px;">ID</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Imię i nazwisko</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Kraj</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Data urodzenia</th>
              </tr>
            </thead>
            <tbody>
        `;

        users.forEach((user) => {
          tableHTML += `
            <tr>
              <td style="border: 1px solid #ccc; padding: 8px;">${user.id}</td>
              <td style="border: 1px solid #ccc; padding: 8px;">${user.name}</td>
              <td style="border: 1px solid #ccc; padding: 8px;">${user.country}</td>
              <td style="border: 1px solid #ccc; padding: 8px;">${user.birthdate}</td>
            </tr>
          `;
        });

        tableHTML += `
            </tbody>
          </table>
        `;

        answer.innerHTML = tableHTML;
      });
  });
})();
