fetch('/html_assets/footer.html')
					.then(response => response.text())
					.then(html => {
						// Створюємо div елемент, в який будемо вставляти HTML
						const externalHeaderContainer = document.createElement('div');
						externalHeaderContainer.innerHTML = html;            

						// Отримуємо елементи з класом "header" з обох файлів
						const externalHeader = externalHeaderContainer.querySelector('.footer');
						const internalHeader = document.querySelector('.footer');

						// Копіюємо HTML з зовнішнього елементу
						const headerHTML = externalHeader.innerHTML;

						// Вставляємо HTML в середину внутрішнього елементу
						internalHeader.innerHTML = headerHTML;
					});